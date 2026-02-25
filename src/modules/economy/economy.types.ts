export type TransactionType =
    | 'EARN'
    | 'SPEND'
    | 'TRANSFER_IN'
    | 'TRANSFER_OUT'
    | 'BANK_DEPOSIT'
    | 'BANK_WITHDRAW'
    | 'TAX'
    | 'INTEREST'
    | 'MARKET_SELL'
    | 'MARKET_BUY'

export interface IWallet {
    id: string
    characterId: string
    cash: bigint
    bankBalance: bigint
    bankDebt: bigint
    totalEarned: bigint
    lastInterest: Date
}

export interface ITransaction {
    id: string
    walletId: string
    type: TransactionType
    amount: bigint
    description: string
    fromId: string | null
    toId: string | null
    createdAt: Date
}