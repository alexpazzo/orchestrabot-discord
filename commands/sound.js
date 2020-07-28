const { Message, VoiceConnection } = require("discord.js");
const fs = require("fs");
const { join } = require("path");

const SOUNDS = fs.readdirSync(join("audio"))
    .filter(file => file.endsWith(".ogg"))
    .map(file => join("audio", file));



module.exports = {
    name: 'sound',
    description: 'Play a sound of the mythic!',
    aliases: ["s"],
    execute,
    playSound
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
        if (process.env.DEBUG) {
            // Debug
            connection.on('debug', console.log);
        }
        // check if there is a argument!
        if (args.length === 0) {
            await playSound(connection);
            return;
        }

        for (const sound of args) {
            await playSound(connection, sound);
        }
    }
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * @param {VoiceConnection} connection 
 */
async function playSound(connection, sound) {
    return new Promise((res, rej) => {
        // If there is no sound to play get it random!
        if (!sound) {
            sound = SOUNDS[random(0, SOUNDS.length - 1)];
        } else {
            sound = SOUNDS.find(savedSound => savedSound.search(sound) > 0)
        }

        if (!sound) return;

        const dispatcher = connection.play(fs.createReadStream(sound), { type: 'ogg/opus' });

        dispatcher.on('finish', () => {
            console.log(`${sound} has finished playing!`);
            res();
            return;
        });

        // Always remember to handle errors appropriately!
        dispatcher.on('error', rej);
    });
};
