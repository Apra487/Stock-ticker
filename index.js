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











// Extra tool
/*
function url(x){
    x= x.toLowerCase().replace(' ', '-');
    return `https://in.investing.com/equities/${x}`
}
 console.log(stocks[i].ticker);
    for (let i = 0; i < stocks.length; i++) {
        let row = url(stocks[i].ticker);
        stocks[i].url = row;
        await stocks[i].save(); 
    }
    let header = ["date", "SBI", "Reliance Industries", "AXIS Bank", "ICICI Bank", "HDFC Bank", "Tata Motors", "Housing Development Finance", "IndusInd Bank", "Indian Oil", "Tata Steel Ltd", "Kotak Mahindra Bank", "ITC", "Federal Bank", "Hindustan Unilever", "Tata Consultancy", "Wipro", "Bharti Airtel", "Infosys", "Oil & Natural Gas", "Piramal Enterprises", "UPL", "Sun Pharma", "IDFC First Bank", "Alok Industries", "Britannia Industries", "Punjab National Bank", "Ashok Leyland", "Vodafone Idea", "Yes Bank", "Bank Of Baroda", "Maruti Suzuki", "RBL Bank", "Titan Company", "Carnation Ind", "Panth Infinity", "Colgate-Palmolive India", "Larsen & Toubro", "Asian Paints", "Bajaj Finance", "Tata Chemicals", "Nestle India", "Tara Chand Logistic", "ACC", "Bajaj Finserv", "Bharat Petroleum", "Indiabulls", "Mahindra & Mahindra", "Bajaj Auto", "Motherson Sumi Systems", "Steel Authority"];
    await sheet.setHeaderRow(header, 1);
*/
