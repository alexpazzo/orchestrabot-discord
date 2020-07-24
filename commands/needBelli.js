const { Message, VoiceConnection } = require("discord.js");
const { playSound } = require('./sound');


module.exports = {
    name: 'needbelli',
    description: 'Add the bot to your Channel!',
    aliases: ["nb"],
    execute
};

/**
 * 
 * @param {Message} message 
 * @param {*} args 
 */
async function execute(message, args) {
    message.reply('Arrivo al volo!');

    // Join the same voice channel of the author of the message
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        if (process.env.DEBUG) {
            // Debug
            connection.on('debug', console.log);
        }

        connection.on('disconnect', (a) => {
            debugger;
        });

        await randomPlaySound(connection);
    }
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * @param {VoiceConnection} connection 
 */
async function randomPlaySound(connection) {
    try {
        // Play a random sound
        await playSound(connection);
        // Set timeout for the next sound
        const next = random(3, 10) * 60 * 1000;
        console.log(`Next sound will be at ${new Date(Date.now() + next).toISOString()}`);

        setTimeout(
            randomPlaySound,
            next,
            connection
        );
    } catch (error) {
        console.error(error);
    }


};
