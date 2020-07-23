const { Message, VoiceConnection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

const SOUNDS = readdirSync(join("audio"))
    .filter(file => file.endsWith(".mp3"))
    .map(file => join("audio", file));



module.exports = {
    name: 'sound',
    description: 'Play a sound of the mythic!',
    aliases: ["s"],
    execute,
    randomPlaySound
};

/**
 * 
 * @param {Message} message 
 * @param {*} args 
 */
async function execute(message, args) {
    // Join the same voice channel of the author of the message
    if (message.member.voice.channel) {
        // TODO ESEGUIRE SUONO SOLO SE IN UN CANALE
        const connection = await message.member.voice.channel.join();

        randomPlaySound(connection);
    }
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * @param {VoiceConnection} connection 
 */
async function randomPlaySound(connection) {
    const soundToPlay = SOUNDS[random(0, SOUNDS.length - 1)];
    connection.play(soundToPlay);
};
