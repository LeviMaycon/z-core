import { createEvent } from "#base";
import { XpService } from "../../modules/xp/application/xp.service.js";
import { XP_RULES } from "../../modules/xp/domain/xp-rules.js";

const xp = new XpService();

createEvent({
    name: "XP Message Listener",
    event: "messageCreate",

    async run(message) {
        if (message.author.bot || !message.guild) return;

        const result = await xp.addXp(
            message.author.id,
            message.guild.id,
            XP_RULES.MIN_LENGTH
        );

        if (result?.leveledUp) {
            await message.reply(
                `🎉 ${message.author} reached level ${result.level}`
            );
        }
    }
});