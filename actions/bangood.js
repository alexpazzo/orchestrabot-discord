
const { Message } = require("discord.js");
const random = require('../utils/random');
const puppeteer = require('puppeteer');

let browser, page;
(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
})();


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

    await page.goto('https://it.banggood.com/Flashdeals.html', {
        waitUntil: 'networkidle0',
    });

    let handles = await page.$$('a.p-img.exclick');

    const single = handles[random(0, handles.length)]

    const href = await single.getProperty('href').then(handle => handle.jsonValue());

    message.channel.send(href);
}  