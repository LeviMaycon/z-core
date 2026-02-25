import { EmbedBuilder, Events, Message, TextChannel } from 'discord.js'
import { CharacterService } from '../../modules/character/application/character.service.js'
import { EconomyService } from '../../modules/economy/application/economy.service.js'

const charService = new CharacterService()
const economyService = new EconomyService()

// Coins ganhos por mensagem (antes de multiplicadores de classe)
const BASE_COINS_PER_MESSAGE = 5n

export default {
    name: Events.MessageCreate,
    async execute(message: Message) {
        // Ignora bots e mensagens fora de servidores
        if (message.author.bot) return
        if (!message.guild) return
        // Ignora mensagens muito curtas (anti-spam)
        if (message.content.length < 5) return

        const discordId = message.author.id
        const guildId = message.guild.id

        // Ganho de EXP (com cooldown interno)
        const expResult = await charService.handleMessageExp(discordId, guildId)

        // Ganho de coins junto com EXP (mesmo cooldown)
        if (expResult !== null) {
            const character = await charService.getOrNull(discordId, guildId)
            if (character) {
                await economyService['repo']?.addCash(
                    character.id,
                    BASE_COINS_PER_MESSAGE,
                    'Ganho por participação',
                    'EARN',
                ).catch(() => { }) // silencia erro de coins para não interromper o fluxo
            }

            // Notifica level up
            if (expResult.leveledUp) {
                const embed = new EmbedBuilder()
                    .setTitle('🎉 LEVEL UP!')
                    .setDescription(
                        `**${message.author.username}** chegou ao **nível ${expResult.newLevel}**!\n\n` +
                        `Você ganhou **3 pontos** para distribuir. Use \`/atributos\` para investir.`,
                    )
                    .setColor(0xfee75c)
                    .setThumbnail(message.author.displayAvatarURL())

                if (message.channel.isTextBased() && !message.channel.isDMBased()) {
                    (message.channel as TextChannel)
                        .send({ embeds: [embed] })
                        .catch(() => { });
                }
            }
        }
    },
}