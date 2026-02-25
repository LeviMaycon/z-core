import { createCommand } from "#base";
import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    EmbedBuilder,
} from "discord.js";
import { EconomyService } from "../../../modules/economy/application/economy.service.js";
import { formatMoney } from "../../../modules/economy/economy.constants.js";

const economyService = new EconomyService();

createCommand({
    name: "saldo",
    description: "Veja seu saldo em mãos e no banco",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        await interaction.deferReply({ ephemeral: true });
        try {
            const wallet = await economyService.getWallet(interaction.user.id, interaction.guildId!);
            const embed = new EmbedBuilder()
                .setTitle("🏦 Seu Banco")
                .setColor(0xfee75c)
                .addFields(
                    { name: "👜 Em mãos", value: formatMoney(wallet.cash), inline: true },
                    { name: "🏦 No banco", value: formatMoney(wallet.bankBalance), inline: true },
                    { name: "💳 Dívidas", value: formatMoney(wallet.bankDebt), inline: true },
                    { name: "📈 Total ganho", value: formatMoney(wallet.totalEarned), inline: true },
                    { name: "ℹ️ Juros", value: "0.5% ao dia sobre o saldo do banco", inline: true },
                );
            await interaction.editReply({ embeds: [embed] });
        } catch (err: any) {
            await interaction.editReply(`❌ ${err.message}`);
        }
    },
});

createCommand({
    name: "depositar",
    description: "Deposite coins no banco",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "valor",
            description: "Valor a depositar",
            type: ApplicationCommandOptionType.Integer,
            required: true,
            minValue: 1,
        },
    ],
    async run(interaction) {
        const valor = BigInt(interaction.options.getInteger("valor", true));
        await interaction.deferReply({ ephemeral: true });
        try {
            const wallet = await economyService.deposit(interaction.user.id, interaction.guildId!, valor);
            await interaction.editReply(`✅ Depositado ${formatMoney(valor)}!\nNovo saldo no banco: ${formatMoney(wallet.bankBalance)}`);
        } catch (err: any) {
            await interaction.editReply(`❌ ${err.message}`);
        }
    },
});

createCommand({
    name: "sacar",
    description: "Saque coins do banco",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "valor",
            description: "Valor a sacar",
            type: ApplicationCommandOptionType.Integer,
            required: true,
            minValue: 1,
        },
    ],
    async run(interaction) {
        const valor = BigInt(interaction.options.getInteger("valor", true));
        await interaction.deferReply({ ephemeral: true });
        try {
            const wallet = await economyService.withdraw(interaction.user.id, interaction.guildId!, valor);
            await interaction.editReply(`✅ Sacado ${formatMoney(valor)}!\nEm mãos: ${formatMoney(wallet.cash)}`);
        } catch (err: any) {
            await interaction.editReply(`❌ ${err.message}`);
        }
    },
});