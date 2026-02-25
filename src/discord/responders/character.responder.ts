import { EmbedBuilder, StringSelectMenuInteraction } from 'discord.js'
import { CharacterService } from '../../modules/character/application/character.service.js'
import { ClassService } from '../../modules/class/application/class.service.js'

const charService = new CharacterService()
const classService = new ClassService()

// customId: choose_class:{characterId}
export async function handleChooseClass(interaction: StringSelectMenuInteraction) {
  const [, characterId] = interaction.customId.split(':')
  const classId = interaction.values[0]

  if (!classId) {
    return interaction.update({
      content: '✅ Sem problema! Você pode escolher sua classe depois com `/classe escolher`.',
      components: [],
      embeds: [],
    })
  }

  try {
    const character = await charService.chooseClass(interaction.user.id, interaction.guildId!, classId)
    const cls = classService.getById(classId)!

    const embed = new EmbedBuilder()
      .setTitle(`${cls.emoji} Classe escolhida: ${cls.name}!`)
      .setDescription(cls.description)
      .setColor(0x57f287)
      .addFields(
        { name: '💰 Bônus de Dinheiro', value: `+${Math.round((cls.moneyMultiplier - 1) * 100)}%`, inline: true },
        { name: '✨ Bônus de EXP', value: `+${Math.round((cls.expMultiplier - 1) * 100)}%`, inline: true },
      )
      .setFooter({ text: `Personagem: ${character.name} | Use /perfil para ver seu status` })

    return interaction.update({ embeds: [embed], components: [] })
  } catch (err: any) {
    return interaction.reply({ content: `❌ ${err.message}`, ephemeral: true })
  }
}

// customId: attr:{attribute}
export async function handleAttributeButton(interaction: any) {
  const [, attribute] = interaction.customId.split(':')

  try {
    const updated = await charService.distributePoint(interaction.user.id, interaction.guildId!, attribute)

    return interaction.reply({
      content: `✅ **${attribute}** aumentado! Pontos restantes: **${updated.freePoints}**`,
      ephemeral: true,
    })
  } catch (err: any) {
    return interaction.reply({ content: `❌ ${err.message}`, ephemeral: true })
  }
}