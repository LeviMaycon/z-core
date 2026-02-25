import { prisma } from "../../../infra/database/prisma.service.js";
import { CHARACTER_CONSTANTS } from "../character.constants.js";
import { ICharacter, ICreateCharacterInput } from "../character.types.js";
import { calcExpToNext } from "../domain/level-calculator.js";

export class CharacterRepository {
    async findByDiscordId(discordId: string, guildId: string): Promise<ICharacter | null> {
        return prisma.character.findUnique({
            where: {
                discordId_guildId: {
                    discordId, guildId
                }
            }
        }) as Promise<ICharacter | null>
    }

    async findById(id: string): Promise<ICharacter | null> {
        return prisma.character.findUnique({ where: { id } }) as Promise<ICharacter | null>
    }

    async create(input: ICreateCharacterInput): Promise<ICharacter> {
        const character = await prisma.character.create({
            data: {
                discordId: input.discordId,
                guildId: input.guildId,
                name: input.name,
                classId: input.classId ?? null,
                expToNext: calcExpToNext(1),
                wallet: {
                    create: {
                        cash: CHARACTER_CONSTANTS.STARTING_CASH,
                    },
                },
            },
        })
        return character as ICharacter;
    }

    async addExp(
        id: string,
        expGain: bigint
    ): Promise<{ character: ICharacter; leveledUp: boolean; newLevel: number }> {
        const character = await prisma.character.findFirstOrThrow({ where: { id } });

        let newExp = character.exp + expGain;
        let newLevel = character.level;
        let newExpToNext = character.expToNext;
        let leveledUp = false;
        let freePoints = character.freePoints;


        while (newExp >= newExpToNext) {
            newExp -= newExpToNext
            newLevel++
            leveledUp = true
            freePoints += CHARACTER_CONSTANTS.POINTS_PER_LEVEL
            newExpToNext = calcExpToNext(newLevel)

            if (newLevel >= CHARACTER_CONSTANTS.MAX_LEVEL) {
                newExp = 0n
                break
            }
        }

        const updated = await prisma.character.update({
            where: { id },
            data: {
                exp: newExp,
                level: newLevel,
                expToNext: newExpToNext,
                freePoints,
                lastActive: new Date(),
            },
        });

        return { character: updated as ICharacter, leveledUp, newLevel };
    }


    async setClass(id: string, classId: string | null): Promise<ICharacter> {
        if (classId !== null) {
            const cls = await prisma.class.findUnique({ where: { id: classId } })
            if (!cls) throw new Error(`Classe ${classId} não existe`)
        }

        return prisma.character.update({
            where: { id },
            data: { classId },
        }) as Promise<ICharacter>
    }

    async distributePoint(id: string, attribute: string): Promise<ICharacter> {
        const char = await prisma.character.findUniqueOrThrow({ where: { id } })

        if (char.freePoints <= 0) throw new Error('Sem pontos disponíveis.')

        const validAttributes = ['strength', 'intelligence', 'agility', 'charisma', 'endurance', 'luck']
        if (!validAttributes.includes(attribute)) throw new Error('Atributo inválido.')

        return prisma.character.update({
            where: { id },
            data: {
                [attribute]: { increment: 1 },
                freePoints: { decrement: 1 },
            },
        }) as Promise<ICharacter>
    }

    async updateLastActive(id: string): Promise<void> {
        await prisma.character.update({
            where: { id },
            data: { lastActive: new Date() },
        })
    }
}