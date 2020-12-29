const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Sheet = require('./sheet');

async function getPrice(url){
    const res = await fetch(url);
    const text = await res.text();
    const $ = cheerio.load(text);
    const price = $('.last-price-and-wildcard bdo').first().text();
    return price;
}
const dayPrices = {};
(async function(){
    const sheet = new Sheet();
    await sheet.load();
    const stocks = await sheet.getRows(0);
    let i = 0;
    console.log(i);
    for (let stock of stocks) {
        const price = await getPrice(stock.url);
        dayPrices[stock.ticker] = price;
        i++;
        console.log(i);
    }
    dayPrices.date = new Date().toString();
    dayPrices.date = dayPrices.date.replace('GMT+0530 (India Standard Time)','IST')
    await sheet.addRows([dayPrices],{insert: true}, 1);
    console.log(dayPrices);
})();






