import { prisma } from "../../../infra/database/prisma.service.js"
import { IWallet, TransactionType } from "../economy.types.js"

export class EconomyRepository {
    async findWalletByCharacterId(characterId: string): Promise<IWallet | null> {
        return prisma.wallet.findUnique({ where: { characterId } }) as Promise<IWallet | null>
    }

    async addCash(characterId: string, amount: bigint, description: string, type: TransactionType = 'EARN'): Promise<IWallet> {
        return prisma.$transaction(async (tx) => {
            const wallet = await tx.wallet.update({
                where: { characterId },
                data: {
                    cash: { increment: amount },
                    totalEarned: type === 'EARN' ? { increment: amount } : undefined,
                },
            })
            await tx.transaction.create({
                data: {
                    walletId: wallet.id,
                    type,
                    amount,
                    description,
                },
            })
            return wallet
        }) as Promise<IWallet>
    }

    async spendCash(characterId: string, amount: bigint, description: string): Promise<IWallet> {
        return prisma.$transaction(async (tx) => {
            const wallet = await tx.wallet.findUniqueOrThrow({ where: { characterId } })
            if (wallet.cash < amount) throw new Error('Saldo insuficiente.')

            const updated = await tx.wallet.update({
                where: { characterId },
                data: { cash: { decrement: amount } },
            })
            await tx.transaction.create({
                data: {
                    walletId: wallet.id,
                    type: 'SPEND',
                    amount,
                    description,
                },
            })
            return updated
        }) as Promise<IWallet>
    }

    async transfer(fromCharacterId: string, toCharacterId: string, amount: bigint): Promise<void> {
        await prisma.$transaction(async (tx) => {
            const fromWallet = await tx.wallet.findUniqueOrThrow({ where: { characterId: fromCharacterId } })
            if (fromWallet.cash < amount) throw new Error('Saldo insuficiente.')

            await tx.wallet.update({ where: { characterId: fromCharacterId }, data: { cash: { decrement: amount } } })
            await tx.wallet.update({ where: { characterId: toCharacterId }, data: { cash: { increment: amount } } })

            await tx.transaction.createMany({
                data: [
                    { walletId: fromWallet.id, type: 'TRANSFER_OUT', amount, description: `Transferência para ${toCharacterId}`, toId: toCharacterId },
                    { walletId: (await tx.wallet.findUniqueOrThrow({ where: { characterId: toCharacterId } })).id, type: 'TRANSFER_IN', amount, description: `Transferência de ${fromCharacterId}`, fromId: fromCharacterId },
                ],
            })
        })
    }

    async deposit(characterId: string, amount: bigint): Promise<IWallet> {
        return prisma.$transaction(async (tx) => {
            const wallet = await tx.wallet.findUniqueOrThrow({ where: { characterId } })
            if (wallet.cash < amount) throw new Error('Saldo em mãos insuficiente.')

            const updated = await tx.wallet.update({
                where: { characterId },
                data: {
                    cash: { decrement: amount },
                    bankBalance: { increment: amount },
                },
            })
            await tx.transaction.create({
                data: { walletId: wallet.id, type: 'BANK_DEPOSIT', amount, description: 'Depósito no banco' },
            })
            return updated
        }) as Promise<IWallet>
    }

    async withdraw(characterId: string, amount: bigint): Promise<IWallet> {
        return prisma.$transaction(async (tx) => {
            const wallet = await tx.wallet.findUniqueOrThrow({ where: { characterId } })
            if (wallet.bankBalance < amount) throw new Error('Saldo no banco insuficiente.')

            const updated = await tx.wallet.update({
                where: { characterId },
                data: {
                    cash: { increment: amount },
                    bankBalance: { decrement: amount },
                },
            })
            await tx.transaction.create({
                data: { walletId: wallet.id, type: 'BANK_WITHDRAW', amount, description: 'Saque do banco' },
            })
            return updated
        }) as Promise<IWallet>
    }

    async applyDailyInterest(): Promise<void> {
        const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)

        const wallets = await prisma.wallet.findMany({
            where: {
                bankBalance: { gt: 0n },
                lastInterest: { lt: cutoff },
            },
        })

        for (const wallet of wallets) {
            const interest = BigInt(Math.floor(Number(wallet.bankBalance) * 0.005))
            if (interest <= 0n) continue

            await prisma.wallet.update({
                where: { id: wallet.id },
                data: {
                    bankBalance: { increment: interest },
                    totalEarned: { increment: interest },
                    lastInterest: new Date(),
                },
            })
            await prisma.transaction.create({
                data: { walletId: wallet.id, type: 'INTEREST', amount: interest, description: 'Juros diários do banco (0.5%)' },
            })
        }
    }
}