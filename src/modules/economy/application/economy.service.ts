import { CharacterService } from "../../character/application/character.service.js"
import { ClassService } from "../../class/application/class.service.js"
import { ECONOMY_CONSTANTS } from "../economy.constants.js"
import { IWallet } from "../economy.types.js"
import { EconomyRepository } from "../infra/economy.repository.js"

const dailyCooldowns = new Map<string, Date>() // characterId -> lastDaily

export class EconomyService {
    private repo = new EconomyRepository()
    private charService = new CharacterService()
    private classService = new ClassService()

    async getWallet(discordId: string, guildId: string): Promise<IWallet> {
        const char = await this.charService.getOrThrow(discordId, guildId)
        const wallet = await this.repo.findWalletByCharacterId(char.id)
        if (!wallet) throw new Error('Carteira não encontrada.')
        return wallet
    }

    async earnFromMessage(characterId: string, classId: string | null, baseAmount: bigint): Promise<void> {
        const multiplier = this.classService.getMoneyMultiplier(classId)
        const amount = BigInt(Math.floor(Number(baseAmount) * multiplier))
        await this.repo.addCash(characterId, amount, 'Ganho por participação', 'EARN')
    }

    async claimDaily(discordId: string, guildId: string): Promise<{ amount: bigint; nextAt: Date }> {
        const char = await this.charService.getOrThrow(discordId, guildId)

        const lastClaim = dailyCooldowns.get(char.id)
        const now = new Date()

        if (lastClaim) {
            const diffHours = (now.getTime() - lastClaim.getTime()) / 3_600_000
            if (diffHours < ECONOMY_CONSTANTS.DAILY_COOLDOWN_HOURS) {
                const nextAt = new Date(lastClaim.getTime() + ECONOMY_CONSTANTS.DAILY_COOLDOWN_HOURS * 3_600_000)
                throw Object.assign(new Error('Você já coletou o daily hoje.'), { nextAt })
            }
        }

        const multiplier = this.classService.getMoneyMultiplier(char.classId)
        const amount = BigInt(Math.floor(Number(ECONOMY_CONSTANTS.DAILY_REWARD) * multiplier))

        await this.repo.addCash(char.id, amount, 'Recompensa diária', 'EARN')
        dailyCooldowns.set(char.id, now)

        const nextAt = new Date(now.getTime() + ECONOMY_CONSTANTS.DAILY_COOLDOWN_HOURS * 3_600_000)
        return { amount, nextAt }
    }

    async pay(fromDiscordId: string, toDiscordId: string, guildId: string, amount: bigint): Promise<void> {
        if (amount < ECONOMY_CONSTANTS.MIN_TRANSFER) throw new Error('Valor mínimo: 1 coin.')
        if (fromDiscordId === toDiscordId) throw new Error('Você não pode transferir para si mesmo.')

        const from = await this.charService.getOrThrow(fromDiscordId, guildId)
        const to = await this.charService.getOrThrow(toDiscordId, guildId)

        await this.repo.transfer(from.id, to.id, amount)
    }

    async deposit(discordId: string, guildId: string, amount: bigint): Promise<IWallet> {
        const char = await this.charService.getOrThrow(discordId, guildId)
        return this.repo.deposit(char.id, amount)
    }

    async withdraw(discordId: string, guildId: string, amount: bigint): Promise<IWallet> {
        const char = await this.charService.getOrThrow(discordId, guildId)
        return this.repo.withdraw(char.id, amount)
    }
}