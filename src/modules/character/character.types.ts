export interface ICharacter {
    id: string
    discordId: string
    guildId: string
    name: string
    classId: string | null
    level: number
    exp: bigint
    expToNext: bigint

    strength: number
    intelligence: number
    agility: number
    charisma: number
    endurance: number
    luck: number
    freePoints: number

    health: number
    maxHealth: number
    energy: number
    maxEnergy: number
    hunger: number
    happiness: number

    currentZoneId: string
    lastActive: Date
    createdAt: Date
    updatedAt: Date
}

export interface IAttributes {
    strength: number
    intelligence: number
    agility: number
    charisma: number
    endurance: number
    luck: number
}

export type AttributeKey = keyof IAttributes

export interface ILevelUpResult {
    leveledUp: boolean
    newLevel: number
    pointsGained: number
    attributeBonus: Partial<IAttributes>
}

export interface ICreateCharacterInput {
    discordId: string
    guildId: string
    name: string
    classId?: string
}