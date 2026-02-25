export interface XpUser {
    userId: string;
    guildId: string;

    xp: number;
    level: number;

    lastXpAt: number;
}