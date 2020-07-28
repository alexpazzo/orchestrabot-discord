const { Message, VoiceConnection } = require("discord.js");
const fs = require("fs");
const { join } = require("path");

const SOUNDS = fs.readdirSync(join("audio"))
    .filter(file => file.endsWith(".ogg"))
    .map(name => {
        // Tags are taken from the filename (numbers are ignored)
        const tags = name
            .replace('.ogg', '')
            .split('_')
            .filter(t => !/^\d+$/.test(t));
        const path = join("audio", name);
        return { name, tags, path };
    });

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

        const tags = args.length ? args : null;
        await playSound({ connection, tags });
    }
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * @param {VoiceConnection} connection 
 */
async function playSound({ connection, tags }) {
    return new Promise((res, rej) => {
        let sound = null;

        // If there are no tags, play a random sound!
        if (!tags) {
            sound = SOUNDS[random(0, SOUNDS.length - 1)];
        } else {
            // Get a list of all the sounds with the requested tags
            const filtered = SOUNDS.filter(s => tags.every(t => s.tags.includes(t)));
            sound = filtered[random(0, filtered.length - 1)];
        }

        if (!sound) throw new Error(`No sounds found with tags "${tags.join(', ')}"`);

        const dispatcher = connection.play(fs.createReadStream(sound.path), { type: 'ogg/opus' });

        dispatcher.on('finish', () => {
            console.log(`${sound.name} (${sound.tags.join(',')}) has finished playing!`);
            res();
            return;
        });

        // Always remember to handle errors appropriately!
        dispatcher.on('error', rej);
    });
};
