import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { EconomyService } from "../../../modules/economy/application/economy.service.js";
import { formatMoney } from "../../../modules/economy/economy.constants.js";

const economyService = new EconomyService();

createCommand({
  name: "pagar",
  description: "Transfira coins para outro jogador",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "jogador",
      description: "Para quem pagar",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "valor",
      description: "Quantidade de coins",
      type: ApplicationCommandOptionType.Number,
      required: true,
      minValue: 1,
    },
  ],
  async run(interaction) {
    const target = interaction.options.getUser("jogador", true);
    const valor = BigInt(interaction.options.getInteger("valor", true));
    await interaction.deferReply();
    try {
      await economyService.pay(interaction.user.id, target.id, interaction.guildId!, valor);
      await interaction.editReply(`✅ Você enviou ${formatMoney(valor)} para **${target.username}**!`);
    } catch (err: any) {
      await interaction.editReply(`❌ ${err.message}`);
    }
  },
});