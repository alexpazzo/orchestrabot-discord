const { Message, VoiceConnection } = require("discord.js");
const { randomPlaySound } = require('./sound');


module.exports = {
    name: 'goaway',
    description: 'Rimuove il bot dal tuo canale!',
    aliases: ["ga"],
    execute
};

/**
 * 
 * @param {Message} message 
 * @param {*} args 
 */
async function execute(message, args) {
    const currentVoiceChannel = message.guild.me.voice.channel;

    if (!currentVoiceChannel) return;

    currentVoiceChannel.leave();
}