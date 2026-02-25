import fs from "fs";
import path from "path";

const root = path.resolve("src");

function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log("📁 created:", dir);
    }
}

function ensureFile(file: string, content = "") {
    ensureDir(path.dirname(file));

    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, content);
        console.log("📄 created:", file);
    }
}

const modules = {
    character: {
        application: [
            "character.service.ts",
            "leveling.service.ts",
            "attributes.service.ts",
        ],
        domain: [
            "level-calculator.ts",
            "attribute-rules.ts",
            "exp-rules.ts",
        ],
        infra: [
            "character.repository.ts",
        ],
        root: [
            "character.constants.ts",
            "character.types.ts",
            "character.utils.ts",
        ],
    },

    class: {
        application: ["class.service.ts"],
        domain: ["class-bonuses.ts", "class-skills.ts"],
        infra: ["class.repository.ts"],
        root: ["class.constants.ts", "class.types.ts"],
    },

    skills: {
        application: ["skills.service.ts"],
        domain: ["skill-tree.ts", "skill-effects.ts"],
        infra: ["skills.repository.ts"],
        root: ["skills.constants.ts", "skills.types.ts"],
    },

    family: {
        application: [
            "family.service.ts",
            "marriage.service.ts",
            "children.service.ts",
        ],
        domain: [
            "marriage-rules.ts",
            "inheritance-rules.ts",
            "family-tree.ts",
        ],
        infra: ["family.repository.ts"],
        root: ["family.constants.ts", "family.types.ts"],
    },

    housing: {
        application: [
            "housing.service.ts",
            "land.service.ts",
        ],
        domain: [
            "house-types.ts",
            "land-rules.ts",
            "property-value.ts",
        ],
        infra: ["housing.repository.ts"],
        root: ["housing.constants.ts", "housing.types.ts"],
    },

    farming: {
        application: [
            "farming.service.ts",
            "crop.service.ts",
        ],
        domain: [
            "crop-types.ts",
            "grow-rules.ts",
            "harvest-calculator.ts",
        ],
        infra: ["farming.repository.ts"],
        root: ["farming.constants.ts", "farming.types.ts"],
    },

    economy: {
        application: [
            "wallet.service.ts",
            "bank.service.ts",
            "tax.service.ts",
            "market.service.ts",
        ],
        domain: [
            "transaction-rules.ts",
            "tax-calculator.ts",
            "interest-calculator.ts",
        ],
        infra: ["economy.repository.ts"],
        root: ["economy.constants.ts", "economy.types.ts"],
    },

    inventory: {
        application: [
            "inventory.service.ts",
            "item.service.ts",
        ],
        domain: [
            "item-types.ts",
            "item-effects.ts",
            "equipment-rules.ts",
        ],
        infra: ["inventory.repository.ts"],
        root: ["inventory.constants.ts", "inventory.types.ts"],
    },

    guild: {
        application: ["guild.service.ts"],
        domain: ["guild-ranks.ts", "guild-rules.ts"],
        infra: ["guild.repository.ts"],
        root: ["guild.constants.ts", "guild.types.ts"],
    },

    map: {
        application: [
            "map.service.ts",
            "travel.service.ts",
        ],
        domain: [
            "zones.ts",
            "travel-rules.ts",
            "zone-events.ts",
        ],
        infra: ["map.repository.ts"],
        root: ["map.constants.ts", "map.types.ts"],
    },
};

function createModules() {
    const modulesRoot = path.join(root, "modules");

    Object.entries(modules).forEach(([moduleName, module]) => {
        const moduleRoot = path.join(modulesRoot, moduleName);

        ensureDir(moduleRoot);

        ["application", "domain", "infra"].forEach((layer) => {
            const files = (module as any)[layer] || [];
            const layerRoot = path.join(moduleRoot, layer);

            ensureDir(layerRoot);

            files.forEach((file: string) => {
                ensureFile(
                    path.join(layerRoot, file),
                    `export class ${file.replace(".ts", "").replace(/-/g, "_")} {}\n`
                );
            });
        });

        (module.root || []).forEach((file: string) => {
            ensureFile(path.join(moduleRoot, file));
        });
    });
}

function createInfra() {
    const dbRoot = path.join(root, "infra", "database");

    ensureFile(
        path.join(dbRoot, "prisma.ts"),
        `
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
`.trim()
    );

    ensureFile(
        path.join(dbRoot, "schema.prisma"),
        `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`.trim()
    );
}

function createCoreFiles() {
    ensureFile(path.join(root, "constants.ts"));
    ensureFile(path.join(root, "env.ts"));
    ensureFile(
        path.join(root, "index.ts"),
        `
async function bootstrap() {
    console.log("z-core started");
}

bootstrap();
`.trim()
    );
}

function main() {
    console.log("🚀 Creating z-core structure...\n");

    createModules();
    createInfra();
    createCoreFiles();

    console.log("\n✅ Structure created successfully.");
}

main();