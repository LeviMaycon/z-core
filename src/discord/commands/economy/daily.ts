import { createCommand } from "#base";
import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { EconomyService } from "../../../modules/economy/application/economy.service.js";
import { formatMoney } from "../../../modules/economy/economy.constants.js";

const economyService = new EconomyService();

createCommand({
  name: "daily",
  description: "Colete sua recompensa diária de coins",
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    await interaction.deferReply();
    try {
      const { amount, nextAt } = await economyService.claimDaily(interaction.user.id, interaction.guildId!);
      const embed = new EmbedBuilder()
        .setTitle("💰 Daily coletado!")
        .setDescription(`Você recebeu ${formatMoney(amount)}!`)
        .setColor(0x57f287)
        .addFields({ name: "⏰ Próximo daily", value: `<t:${Math.floor(nextAt.getTime() / 1000)}:R>` });
      return interaction.editReply({ embeds: [embed] });
    } catch (err: any) {
      if (err.nextAt) {
        return interaction.editReply(`❌ Você já coletou hoje! Próximo daily: <t:${Math.floor(err.nextAt.getTime() / 1000)}:R>`);
      }
      return interaction.editReply(`❌ ${err.message}`);
    }
  },
});