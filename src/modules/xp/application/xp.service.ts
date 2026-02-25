import { XpRepository } from "../infra/xp.repository.js";
import { XP_CONFIG } from "../xp.constants.js";
import { calculateLevel } from "../xp.utils.js";


export class XpService {
    private repo = new XpRepository();
    private cooldown = new Map<string, number>();

    private canGain(userId: string) {
        const now = Date.now();
        const last = this.cooldown.get(userId);
        
        if(!last || now - last > 30000) {
            this.cooldown.set(userId, now);
            return true;
        }

        return false;
    }

    async addXp(userId: string, guildId: string, xp: number) {
        let user = await this.repo.find(userId, guildId);

        if(!user) {
            user = {
                userId,
                guildId,
                xp: 0,
                level: 0,
                lastXpAt: 0
            };
        }

        if(!this.canGain(userId)) return null;

        const now = Date.now();

        if (now - user.lastXpAt < XP_CONFIG.cooldown) return null;

        const gained = Math.floor(Math.random() * XP_CONFIG.maxXp - XP_CONFIG.minXp) + XP_CONFIG.minXp;
        
        user.xp += gained;

        const newLevel = calculateLevel(user.xp);

        const leveledUp = newLevel > user.level;

        user.level = newLevel;
        user.lastXpAt = now;

        await this.repo.save(user);

        return {
            xp: user.xp,
            level: user.level,
            gained,
            leveledUp
        };
    }

    async get(userId: string, guildId: string) {
        return this.repo.find(
            userId,
            guildId
        );
    }
}