import { AnswerXpPolicy } from "../domain/answer-xp.policy.js";
import { XpService } from "./xp.service.js";

export class LevelingService {
    private aswerPolicy = new AnswerXpPolicy();
    private xpService = new XpService();

    async handleAnswer(
        userId: string,
        guildId: string,
        isCorrect: boolean
    ) {
        if (!this.aswerPolicy.canGainXp(userId)) {
            return null;
        }

        const xp = this.aswerPolicy.getXp(isCorrect);

        return this.xpService.addXp(userId, guildId, xp);
    }
}