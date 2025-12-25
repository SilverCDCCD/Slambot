require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits, MessageFlags, Message } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const {deploy} = require("./deploy-commands.js");

require("dotenv").config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once(Events.ClientReady, (readyClient) => {
    console.log("Slambot, online!");
});

client.commands = new Collection();
deploy();

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error( `Error! Command not found: ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    }
    catch (ex) {
        console.error(`Error: ${error}`);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: `Error! Counot execute command ${interaction.commandName}`,
                flags: MessageFlags.Ephemeral
            });
        }
        else {
            await interaction.reply({
                content: `Error! Counot execute command ${interaction.commandName}`,
                flags: MessageFlags.Ephemeral
            });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);