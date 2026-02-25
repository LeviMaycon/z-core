export function calcExpToNext(level: number): bigint {
    return BigInt(Math.floor(100 * Math.pow(level, 1.5)));
}

export function calcTotalExpForLevel(level: number): bigint {
    let total = 0n;

    for(let i = 1; i< level; i++) {
        total += calcExpToNext(i)
    }

    return total
}

export function calcExpGain(base: number, multiplier: number): bigint {
    const variation = 0.8 + Math.random() * 0.4 // 80% ~ 120%
    return BigInt(Math.floor(base * multiplier * variation));
}