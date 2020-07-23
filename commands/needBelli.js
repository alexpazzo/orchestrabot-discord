module.exports = {
    name: 'needbelli',
    description: 'Add the bot to your Channel!',
    aliases: ["nB"],
    async execute(msg, args) {
        msg.reply('Arrivo al volo!');

        // Join the same voice channel of the author of the message
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            // Debug
            connection.on('debug', console.log);

            //connection.play('audio/belli-burp.mp3');

            //connection.disconnect();
        }
    },
};


