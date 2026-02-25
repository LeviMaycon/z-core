import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ============================================================
// 🌱 SEED
// ============================================================

async function main() {
    console.log("🌱 Iniciando seed...\n");

    await seedClasses();

    console.log("\n✅ Seed concluído!");
}

// ============================================================
// ⚔️ CLASSES
// ============================================================

async function seedClasses() {
    console.log("⚔️  Criando classes...");

    const classes = [
        {
            id: "farmer",
            name: "Fazendeiro",
            description: "Mestre da terra. Faz plantações crescerem mais rápido e com maior rendimento.",
            emoji: "🌾",
            strBonus: 1,
            intBonus: 0,
            agiBonus: 0,
            chaBonus: 0,
            endBonus: 2,
            luckBonus: 1,
            expMultiplier: 1.0,
            moneyMultiplier: 1.1,
        },
        {
            id: "businessman",
            name: "Empresário",
            description: "Tudo gira em torno do dinheiro. Ganha mais em todo tipo de transação.",
            emoji: "💼",
            strBonus: 0,
            intBonus: 2,
            agiBonus: 0,
            chaBonus: 2,
            endBonus: 0,
            luckBonus: 0,
            expMultiplier: 1.0,
            moneyMultiplier: 1.25,
        },
        {
            id: "builder",
            name: "Construtor",
            description: "Constrói mais barato e melhor. Casas e propriedades têm mais valor.",
            emoji: "🔨",
            strBonus: 3,
            intBonus: 1,
            agiBonus: 0,
            chaBonus: 0,
            endBonus: 2,
            luckBonus: 0,
            expMultiplier: 1.0,
            moneyMultiplier: 1.0,
        },
        {
            id: "herbalist",
            name: "Herbalista",
            description: "Conhece os segredos das plantas. Produz itens raros e poções potentes.",
            emoji: "🌿",
            strBonus: 0,
            intBonus: 3,
            agiBonus: 1,
            chaBonus: 0,
            endBonus: 0,
            luckBonus: 2,
            expMultiplier: 1.1,
            moneyMultiplier: 1.0,
        },
        {
            id: "diplomat",
            name: "Diplomata",
            description: "Carisma acima de tudo. Relações sociais são mais fáceis e lucrativas.",
            emoji: "🎭",
            strBonus: 0,
            intBonus: 1,
            agiBonus: 0,
            chaBonus: 4,
            endBonus: 0,
            luckBonus: 1,
            expMultiplier: 1.0,
            moneyMultiplier: 1.15,
        },
        {
            id: "miner",
            name: "Minerador",
            description: "Extrai mais recursos e encontra materiais raros ao explorar.",
            emoji: "⛏️",
            strBonus: 3,
            intBonus: 0,
            agiBonus: 0,
            chaBonus: 0,
            endBonus: 3,
            luckBonus: 0,
            expMultiplier: 1.0,
            moneyMultiplier: 1.0,
        },
        {
            id: "adventurer",
            name: "Aventureiro",
            description: "Nasceu para explorar. Viagens mais baratas e eventos especiais pelo mundo.",
            emoji: "🏹",
            strBonus: 1,
            intBonus: 1,
            agiBonus: 3,
            chaBonus: 0,
            endBonus: 0,
            luckBonus: 1,
            expMultiplier: 1.1,
            moneyMultiplier: 1.0,
        },
        {
            id: "sage",
            name: "Sábio",
            description: "Aprende mais rápido que qualquer outro. Ganha +15% de EXP em tudo.",
            emoji: "📚",
            strBonus: 0,
            intBonus: 4,
            agiBonus: 0,
            chaBonus: 0,
            endBonus: 0,
            luckBonus: 2,
            expMultiplier: 1.15,
            moneyMultiplier: 1.0,
        },
    ];

    for (const cls of classes) {
        await prisma.class.upsert({
            where: { id: cls.id },
            update: cls,
            create: cls,
        });
        console.log(`   ${cls.emoji}  ${cls.name}`);
    }
}

// ============================================================
// 🚀 RUN
// ============================================================

main()
    .catch((e) => {
        console.error("❌ Erro no seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });