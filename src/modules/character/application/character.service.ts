import { ClassService } from "../../class/application/class.service.js"
import { CHARACTER_CONSTANTS } from "../character.constants.js"
import { ICharacter, ICreateCharacterInput } from "../character.types.js"
import { calcExpGain } from "../domain/level-calculator.js"
import { CharacterRepository } from "../infra/character.repository.js"

const expCooldowns = new Map<string, number>() // discordId -> timestamp

export class CharacterService {
  private repo = new CharacterRepository()
  private classService = new ClassService()

  async getOrNull(discordId: string, guildId: string): Promise<ICharacter | null> {
    return this.repo.findByDiscordId(discordId, guildId)
  }

  async getOrThrow(discordId: string, guildId: string): Promise<ICharacter> {
    const char = await this.repo.findByDiscordId(discordId, guildId)
    if (!char) throw new Error('Você ainda não tem um personagem! Use `/criar-personagem` para começar.')
    return char
  }

  async create(input: ICreateCharacterInput): Promise<ICharacter> {
    const existing = await this.repo.findByDiscordId(input.discordId, input.guildId)
    if (existing) throw new Error('Você já tem um personagem neste servidor!')
    return this.repo.create(input)
  }

  async handleMessageExp(
    discordId: string,
    guildId: string,
  ): Promise<{ leveledUp: boolean; newLevel: number } | null> {
    // Cooldown: não ganha EXP toda mensagem
    const lastGain = expCooldowns.get(discordId) ?? 0
    const now = Date.now()
    if (now - lastGain < CHARACTER_CONSTANTS.EXP_COOLDOWN_MS) return null

    const character = await this.repo.findByDiscordId(discordId, guildId)
    if (!character) return null

    expCooldowns.set(discordId, now)

    const multiplier = this.classService.getExpMultiplier(character.classId)
    const expGain = calcExpGain(CHARACTER_CONSTANTS.BASE_EXP_PER_MESSAGE, multiplier)

    const { leveledUp, newLevel } = await this.repo.addExp(character.id, expGain)
    return { leveledUp, newLevel }
  }

  async chooseClass(discordId: string, guildId: string, classId: string): Promise<ICharacter> {
    const character = await this.getOrThrow(discordId, guildId)

    if (character.classId) throw new Error('Você já escolheu uma classe! Não é possível mudar.')
    if (character.level > 5) throw new Error('Só é possível escolher uma classe até o nível 5.')

    const cls = this.classService.getById(classId)
    if (!cls) throw new Error('Classe inválida.')

    return this.repo.setClass(character.id, classId)
  }

  async distributePoint(discordId: string, guildId: string, attribute: string): Promise<ICharacter> {
    const character = await this.getOrThrow(discordId, guildId)
    if (character.freePoints <= 0) throw new Error('Você não tem pontos para distribuir.')
    return this.repo.distributePoint(character.id, attribute)
  }
}