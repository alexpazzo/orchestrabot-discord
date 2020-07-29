const fetch = require('node-fetch');
const { Message } = require("discord.js");
const random = require('../utils/random');

module.exports = {
    name: 'reddit',
    execute
};


/**
 * 
 * @param {string} subreddit 
 * @param {Message} message 
 */
async function execute(subreddit, message) {
    if (!subreddit) throw new Error('Missing subreddit');

    // Call reddit api
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=100`);
    const { data } = await response.json();
    // Filter only post with image
    const postWithImage = data.children.filter(child => child.data['post_hint'] === 'image');
    // Get a random Post
    const post = postWithImage[random(0, postWithImage.length)];

    await message.channel.send(`${post.data.title} \n ${post.data.url}`);

}