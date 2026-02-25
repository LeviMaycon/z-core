import { createCommand } from "#base";
import {
    ActionRowBuilder,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    EmbedBuilder,
    StringSelectMenuBuilder,
} from "discord.js";
import { CharacterService } from "../../../modules/character/application/character.service.js";
import { ClassService } from "../../../modules/class/application/class.service.js";

const charService = new CharacterService();
const classService = new ClassService();

createCommand({
    name: "criar-personagem",
    description: "Cria o seu personagem no RPG",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nome",
            description: "Nome do seu personagem",
            type: ApplicationCommandOptionType.String,
            required: true,
            maxLength: 32,
        },
    ],
    async run(interaction) {
        const name = interaction.options.getString("nome", true).trim();
        const discordId = interaction.user.id;
        const guildId = interaction.guildId!;

        const existing = await charService.getOrNull(discordId, guildId);
        if (existing) {
            await interaction.reply({
                content: "❌ Você já tem um personagem! Use `/perfil` para ver seu status.",
                ephemeral: true,
            });
            return;
        }

        const character = await charService.create({ discordId, guildId, name });

        const classes = classService.getAll();
        const select = new StringSelectMenuBuilder()
            .setCustomId(`choose_class:${character.id}`)
            .setPlaceholder("Escolha sua classe (pode pular por agora)")
            .setMinValues(0)
            .setMaxValues(1)
            .addOptions(
                classes.map((c) => ({
                    label: `${c.emoji} ${c.name}`,
                    description: c.description.slice(0, 100),
                    value: c.id,
                })),
            );

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);

        const embed = new EmbedBuilder()
            .setTitle(`⚔️ Bem-vindo ao mundo, ${name}!`)
            .setDescription(
                "Seu personagem foi criado com sucesso.\n\n" +
                "**Escolha sua classe** para receber bônus especiais.\n" +
                "Você pode pular e escolher depois até o **nível 5**.\n\n" +
                "> 💡 Cada classe tem um estilo de jogo diferente!",
            )
            .setColor(0x5865f2)
            .addFields(
                { name: "📊 Nível", value: "1", inline: true },
                { name: "💵 Coins", value: "500", inline: true },
                { name: "🎯 Pontos livres", value: "0", inline: true },
            )
            .setFooter({ text: "Distribua pontos de atributo ao subir de nível" });

        await interaction.reply({ embeds: [embed], components: [row] });
    },
});