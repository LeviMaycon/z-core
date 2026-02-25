export interface IClass {
    id: string
    name: string
    description: string
    emoji: string

    strBonus: number
    intBonus: number
    agiBonus: number
    chaBonus: number
    endBonus: number
    luckBonus: number

    expMultiplier: number
    moneyMultiplier: number
}

export type ClassId =
    | 'farmer'
    | 'businessman'
    | 'builder'
    | 'herbalist'
    | 'diplomat'
    | 'miner'
    | 'adventurer'
    | 'sage'