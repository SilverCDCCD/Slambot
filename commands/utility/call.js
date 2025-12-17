const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    "data": new SlashCommandBuilder()
        .setName("call")
        .setDescription("Call Slambot"),
    async execute(interaction) {
        await interaction.reply("Slambot, awaiting orders!");
    }
}