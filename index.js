require('dotenv').config()
const { Client, Collection } = require('discord.js');
const fs = require("fs");
const { join } = require("path");
const { CronJob } = require('cron');

const client = new Client();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;

/**
 * Import all commands
 */
const commandFiles = fs.readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", file));
    client.commands.set(command.name, command);
}

/**
 * Ready Event
 */
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // add cron for leave work
    var job = new CronJob('* 18 * * *', function () {
        console.log('broadcast')
        const broadcast = client.voice.createBroadcast();
        // TODO change with the real audio
        broadcast.play(fs.createReadStream('audio / nonlesei.mp3'), { type: 'ogg/opus' });
        for (const connection of client.voice.connections.values()) {
            connection.play(broadcast);
        }
    }, null, true, 'Europe/Rome');
    job.start();

});

/**
 * Event every time a new message is write.
 */
client.on('message', async msg => {
    if (msg.author.bot) return;
    // check if is a command
    if (!msg.content.startsWith(PREFIX)) return;
    // Remove the prefix
    const args = msg.content.slice(PREFIX.length).trim().split(/ +/);
    // Get command name
    const commandName = args.shift().toLowerCase();
    // Check if command exist
    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    // if not do nothing
    if (!command) return;
    // else execute command
    try {
        await command.execute(msg, args);
    } catch (err) {
        console.error(err);
        msg.reply(`_There was an error executing that command_.\n${err.message}`).catch(console.error);
    }
});

if (process.env.DEBUG) {
    // Debug
    client.on('debug', console.log);
}
