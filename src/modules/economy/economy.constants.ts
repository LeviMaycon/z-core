export const ECONOMY_CONSTANTS = {
    CURRENCY_SYMBOL: '💵',
    CURRENCY_NAME: 'coins',
    DAILY_REWARD: 200n,
    DAILY_COOLDOWN_HOURS: 22,
    BANK_INTEREST_RATE: 0.005, // 0.5% por dia
    BANK_INTEREST_INTERVAL_HOURS: 24,
    MAX_TRANSFER_PER_DAY: 50_000n,
    MIN_TRANSFER: 1n,
} as const

export function formatMoney(amount: bigint): string {
    return `💵 ${amount.toLocaleString('pt-BR')}`
}