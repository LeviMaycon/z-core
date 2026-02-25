import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } from "discord.js";
import { CharacterService } from "../../../modules/character/application/character.service.js";
import { ClassService } from "../../../modules/class/application/class.service.js";

const charService = new CharacterService();
const classService = new ClassService();

createCommand({
    name: "classe",
    description: "Escolha ou veja as classes disponíveis",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "lista",
            description: "Ver todas as classes disponíveis",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "escolher",
            description: "Escolha sua classe (somente até o nível 5)",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "id",
                    description: "ID da classe (veja com /classe lista)",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        },
    ],
    async run(interaction) {
        const sub = interaction.options.getSubcommand();

        if (sub === "lista") {
            const classes = classService.getAll();
            const embed = new EmbedBuilder()
                .setTitle("⚔️ Classes Disponíveis")
                .setDescription("Escolha sua classe até o **nível 5** com `/classe escolher <id>`.")
                .setColor(0x5865f2)
                .addFields(
                    classes.map((c) => ({
                        name: `${c.emoji} ${c.name} — \`${c.id}\``,
                        value:
                            c.description +
                            `\n💰 Dinheiro: **+${Math.round((c.moneyMultiplier - 1) * 100)}%** | ✨ EXP: **+${Math.round((c.expMultiplier - 1) * 100)}%**`,
                        inline: false,
                    })),
                );
            return interaction.reply({ embeds: [embed] });
        }

        if (sub === "escolher") {
            const classId = interaction.options.getString("id", true).toLowerCase();
            try {
                const character = await charService.chooseClass(interaction.user.id, interaction.guildId!, classId);
                const cls = classService.getById(classId)!;

                const embed = new EmbedBuilder()
                    .setTitle(`${cls.emoji} Classe escolhida: ${cls.name}!`)
                    .setDescription(cls.description)
                    .setColor(0x57f287)
                    .addFields(
                        { name: "💰 Bônus de Dinheiro", value: `+${Math.round((cls.moneyMultiplier - 1) * 100)}%`, inline: true },
                        { name: "✨ Bônus de EXP", value: `+${Math.round((cls.expMultiplier - 1) * 100)}%`, inline: true },
                    )
                    .setFooter({ text: `Personagem: ${character.name} | Nível ${character.level}` });

                return interaction.reply({ embeds: [embed] });
            } catch (err: any) {
                return interaction.reply({ content: `❌ ${err.message}`, ephemeral: true });
            }
        }
    },
});