require('dotenv').config()
const { Client, Collection } = require('discord.js');
const { readdirSync } = require("fs");
const { join } = require("path");
const client = new Client();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", file));
    client.commands.set(command.name, command);
}


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', async msg => {
    try {
        if (msg.author.bot) return;

        const args = msg.content.slice(PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        try {
            command.execute(msg, args);
        } catch (error) {
            console.error(error);
            msg.reply("There was an error executing that command.").catch(console.error);
        }

    } catch (error) {
        msg.reply(error.message);
    }

});

// Debug
client.on('debug', console.log);
