import { XP_RULES } from "./xp-rules.js";


export class AnswerXpPolicy {
    private lastGain = new Map<string, number>();

    canGainXp(userId: string) {
        const now = Date.now();
        const last = this.lastGain.get(userId);

        if(!last)
        {
            this.lastGain.set(userId, now);
            return true;
        }

        if(now - last >= XP_RULES.COOLDOWN_MS) {
            this.lastGain.set(userId, now);
            return true;
        }

        return false;
    }

    getXp(isCorrect: boolean) {
        return isCorrect 
        ? XP_RULES.CORRECT_ANSWER
        : XP_RULES.ANSWER
    }
}