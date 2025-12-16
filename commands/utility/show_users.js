const { SlashCommandBuilder, GatewayIntentBits } = require("discord.js");
const users = require("./users.json");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("show-user-codes")
        .setDescription("Show the user codes for all users in the server."),
    async execute(interaction) {
        let result = "";
        let allMembers = "Members:\n";
        Object.keys(interaction.client.guilds.cache.get(config.guildId).members).forEach((it) => allMembers += `\t${it}\n`);
        console.log(interaction.guild);
        // console.log(allMembers);
        
        Object.keys(users.codes).forEach((it) => result += `${it}: ${it}\n`);
        await interaction.reply(result);
    }
};