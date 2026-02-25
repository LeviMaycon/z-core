import { createCommand } from "#base";
import { brBuilder, createEmbed } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";

const getMockBalance = (userId: string): number => {
    return userId.length * 100;
};

createCommand({
    name: "money",
    description: "Check your money balance",
    type: ApplicationCommandType.ChatInput,

    async run(interaction) {
        try {
            const balance = getMockBalance(interaction.user.id);

            const embed = createEmbed({
                color: 0x00ff99,
                title: "💰 Money Balance",
                description: brBuilder(
                    `User: <@${interaction.user.id}>`,
                    `Balance: **$${balance.toLocaleString()}**`
                ),
                footer: {
                    text: "Economy System • Z-Core"
                },
                timestamp: new Date()
            });

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });

        } catch (error) {

            console.error("money command error:", error);

            await interaction.reply({
                content: "❌ Failed to fetch balance.",
                ephemeral: true
            });

        }
    }
});