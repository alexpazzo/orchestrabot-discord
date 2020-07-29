const { Message, VoiceConnection } = require("discord.js");
const Sound = require('./sound');
const random = require('../utils/random');

module.exports = {
    name: 'needorchestra',
    description: 'Aggiunge il bot al tuo canale!',
    aliases: ["no"],
    execute
};

/**
 * 
 * @param {Message} message 
 * @param {*} args 
 */
async function execute(message, args) {
    message.reply('Arriviamo al volo!');

    // Join the same voice channel of the author of the message
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        if (process.env.DEBUG) {
            // Debug
            connection.on('debug', console.log);
        }

        await randomPlaySound(message, args);

    }
}

/**
 * @param {VoiceConnection} connection 
 */
async function randomPlaySound(message, args) {
    // Play a random sound
    await Sound.execute(message, args);

    // Set timeout for the next sound
    const next = random(5, 15) * 60 * 1000;

    console.log(`Next sound will be at ${new Date(Date.now() + next).toISOString()}`);

    setTimeout(
        randomPlaySound,
        next,
        message,
        []
    );
};
