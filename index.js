const axios = require('axios');
const cheerio = require('cheerio');

const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

async function webScraping(url, selector) {
    let res = [];
    let html = await axios.get(url);
    let $ = cheerio.load(html.data);
  
    for(let v of $(selector)) {   
        res.push($(v).text());
    }
  
    return res;
}

let url = 'https://ramses.kr/compare';
let selector = 'body > div > div > div > div > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1)';

webScraping(url, selector).then((res) => {
  console.log(res)
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/get_market_share', (req, res) => res.send(result))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


result = "15%"

