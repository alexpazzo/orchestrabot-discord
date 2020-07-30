
const { Message } = require("discord.js");
const { default: fetch } = require("node-fetch");
const cheerio = require('cheerio');
const random = require('../utils/random');

module.exports = {
    name: 'bangood',
    execute
};


/**
 * 
 * @param {string} subreddit 
 * @param {Message} message 
 */
async function execute(arg, message) {

    const page = await fetch('https://it.banggood.com/Flashdeals.html').then(res => res.text());

    const $ = cheerio.load(page);

    let allitems = $('.product-item > a');

    const single = allitems[random(0, allitems.length)];

    message.channel.send(single.attribs.href);
}  