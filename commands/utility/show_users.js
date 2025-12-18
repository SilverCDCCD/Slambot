const { SlashCommandBuilder } = require("discord.js");
const users = require("./users.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("show-user-codes")
        .setDescription("Show the user codes for all users in the server."),
    async execute(interaction) {
        let result = "";
        Object.keys(users.codes).forEach((it) => result += `${users.codes[it]}: ${it}\n`);
        await interaction.reply(result);
    }
};