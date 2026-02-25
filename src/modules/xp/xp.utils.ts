export function calculateLevel(xp: number): number {
    return Math.floor(
        0.1 * Math.sqrt(xp)
    )
}

export function calculateXpForNextLevel(level: number): number {
    return Math.pow(
        (level + 1) / 0.1,
        2
    );
}