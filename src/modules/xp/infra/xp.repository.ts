const cache = new Map<string, any>();

export class XpRepository {
    private key(userId: string, guildId: string): string {
        return `${userId}:${guildId}`;
    }

    async find(userId: string, guildId: string) {
        return cache.get(
            this.key(userId, guildId)
        );
    }

    async save(data: any) {
        cache.set(
            this.key(data.userId, data.guildId),
            data
        );
        return data;
    }
}