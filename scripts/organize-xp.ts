import fs from "fs";
import path from "path";

const root = path.resolve("src/modules/xp");

const structure = {
    domain: [
        "leveling/domain/answer-xp.policy.ts",
        "leveling/domain/level-calculator.ts",
        "leveling/domain/xp-rules.ts",
    ],
    application: [
        "leveling/domain/leveling.service.ts",
        "xp.service.ts",
    ],
    infra: [
        "xp.repository.ts",
    ],
};

function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function moveFile(oldPath: string, newPath: string) {
    if (!fs.existsSync(oldPath)) return;

    ensureDir(path.dirname(newPath));
    fs.renameSync(oldPath, newPath);
    console.log(`✔ Moved: ${oldPath} → ${newPath}`);
}

function organize() {
    console.log("🚀 Organizando módulo XP...");

    Object.entries(structure).forEach(([folder, files]) => {
        const targetDir = path.join(root, folder);

        ensureDir(targetDir);

        files.forEach((file) => {
            const oldPath = path.join(root, file);
            const fileName = path.basename(file);
            const newPath = path.join(targetDir, fileName);

            moveFile(oldPath, newPath);
        });
    });

    // Remove pasta antiga leveling se estiver vazia
    const oldLevelingPath = path.join(root, "leveling");
    if (fs.existsSync(oldLevelingPath)) {
        fs.rmSync(oldLevelingPath, { recursive: true, force: true });
        console.log("🧹 Removed old leveling folder");
    }

    console.log("✅ Organização concluída.");
}

organize();