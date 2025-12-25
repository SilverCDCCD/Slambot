const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("teset")
            .setDescription("Test command."),
    async execute(interaction) {
        await interaction.reply("Teset");
    }
}