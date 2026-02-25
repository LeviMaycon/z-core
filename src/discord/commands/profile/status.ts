import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } from "discord.js";
import { CharacterService } from "../../../modules/character/application/character.service.js";
import { ATTRIBUTE_LABELS } from "../../../modules/character/character.constants.js";
import { ClassService } from "../../../modules/class/application/class.service.js";
import { formatMoney } from "../../../modules/economy/economy.constants.js";
import { EconomyRepository } from "../../../modules/economy/infra/economy.repository.js";

const charService = new CharacterService();
const economyRepo = new EconomyRepository();
const classService = new ClassService();

createCommand({
    name: "perfil",
    description: "Veja o seu perfil ou o de outro jogador",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "jogador",
            description: "Jogador para ver o perfil",
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
    async run(interaction) {
        const target = interaction.options.getUser("jogador") ?? interaction.user;
        const guildId = interaction.guildId!;

        await interaction.deferReply();

        const character = await charService.getOrNull(target.id, guildId);
        if (!character) {
            return interaction.editReply(
                target.id === interaction.user.id
                    ? "❌ Você ainda não tem um personagem! Use `/criar-personagem` para começar."
                    : `❌ ${target.username} ainda não tem um personagem.`,
            );
        }

        const wallet = await economyRepo.findWalletByCharacterId(character.id);
        const cls = character.classId ? classService.getById(character.classId) : null;

        const expPercent = Number((character.exp * 100n) / character.expToNext);
        const filled = Math.floor(expPercent / 10);
        const expBar = "█".repeat(filled) + "░".repeat(10 - filled);

        const hpFilled = Math.floor((character.health / character.maxHealth) * 10);
        const hpBar = "❤️".repeat(hpFilled) + "🖤".repeat(10 - hpFilled);

        const embed = new EmbedBuilder()
            .setTitle(`${cls?.emoji ?? "👤"} ${character.name}`)
            .setDescription(
                cls
                    ? `**Classe:** ${cls.emoji} ${cls.name}`
                    : "**Sem classe** — Use `/classe escolher` até o nível 5",
            )
            .setThumbnail(target.displayAvatarURL())
            .setColor(0x5865f2)
            .addFields(
                {
                    name: "📊 Progresso",
                    value: [`**Nível** ${character.level} ${expBar}`, `EXP: ${character.exp.toLocaleString()} / ${character.expToNext.toLocaleString()}`].join("\n"),
                    inline: false,
                },
                { name: "❤️ Saúde", value: `${hpBar}\n${character.health}/${character.maxHealth}`, inline: true },
                { name: "⚡ Energia", value: `${character.energy}/${character.maxEnergy}`, inline: true },
                { name: "😊 Felicidade", value: `${character.happiness}/100`, inline: true },
                {
                    name: "📈 Atributos",
                    value: Object.entries(ATTRIBUTE_LABELS)
                        .map(([key, label]) => `${label}: **${(character as any)[key]}**`)
                        .join("\n"),
                    inline: true,
                },
                {
                    name: "💰 Finanças",
                    value: wallet
                        ? [`Em mãos: ${formatMoney(wallet.cash)}`, `No banco: ${formatMoney(wallet.bankBalance)}`].join("\n")
                        : "—",
                    inline: true,
                },
            );

        if (character.freePoints > 0) {
            embed.setFooter({ text: `🎯 Você tem ${character.freePoints} ponto(s) para distribuir! Use /atributos` });
        }

        return interaction.editReply({ embeds: [embed] });
    },
});