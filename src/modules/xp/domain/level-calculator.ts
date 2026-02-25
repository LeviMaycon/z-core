export class LevelCalculator {
    static xpFor(level: number) {
        return 100 * level * level;
    }

    static levelFromXp(xp: number) {
        let level = 0;

        while (xp >= this.xpFor(level + 1)) {
            level++;
        }

        return level;
    }
}