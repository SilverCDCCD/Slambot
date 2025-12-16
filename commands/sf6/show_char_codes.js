const { SlashCommandBuilder } = require("discord.js");
const chars = require("./_chars.json");

module.exports = {
    data: new SlashCommandBuilder().setName("show-char-codes-sf6").setDescription("Shows all character codes for Street Fighter 6."),
    async execute(interaction) {
        let result = "";
        Object.keys(chars).forEach((key) => result = `${chars[key]}: ${key}`);
        await interaction.reply(result);
    }
}