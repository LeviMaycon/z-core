import { createCommand } from "#base";
import { ApplicationCommandType } from "discord.js";
import { XpService } from "../../../modules/xp/application/xp.service.js";

const xp = new XpService();

createCommand({

    name: "rank",
    description: "Show your level",
    type: ApplicationCommandType.ChatInput,

    async run(interaction) {

        const user =
            await xp.get(
                interaction.user.id,
                interaction.guildId!
            );

        if (!user) {

            return interaction.reply({
                content: "No XP yet",
                ephemeral: true
            });

        }

        return await interaction.reply({

            content:
                `Level: ${user.level}\nXP: ${user.xp}`,

            ephemeral: true

        });

    }

});