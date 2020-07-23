const { Message, VoiceConnection } = require("discord.js");
const { randomPlaySound } = require('./sound');


module.exports = {
    name: 'needbelli',
    description: 'Add the bot to your Channel!',
    aliases: ["nB"],
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
        // Debug
        connection.on('debug', console.log);

        await randomPlay(connection);
    }
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * @param {VoiceConnection} connection 
 */
async function randomPlay(connection) {

    await randomPlaySound(connection);

    setTimeout(
        randomPlay,
        random(3, 10) * 60 * 1000
    );

};
