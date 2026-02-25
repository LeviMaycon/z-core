export const CHARACTER_CONSTANTS = {
    BASE_EXP_PER_MESSAGE: 10,
    EXP_COOLDOWN_MS: 60_000,         // 1 minuto entre ganhos de EXP
    POINTS_PER_LEVEL: 3,             // pontos de atributo por nível
    BASE_HEALTH_PER_ENDURANCE: 10,
    BASE_ENERGY_PER_AGILITY: 5,
    MAX_LEVEL: 100,
    STARTING_CASH: 500n,
} as const

export const ATTRIBUTE_LABELS: Record<string, string> = {
    strength: '💪 Força',
    intelligence: '🧠 Inteligência',
    agility: '⚡ Agilidade',
    charisma: '🗣️ Carisma',
    endurance: '🛡️ Resistência',
    luck: '🍀 Sorte',
}