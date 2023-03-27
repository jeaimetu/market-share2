const axios = require('axios');
const cheerio = require('cheerio');

const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

async function webScraping(url, selector) {
    let res = [];
    let html = await axios.get(url);
    
    console.log("get data from " + url)
    let $ = cheerio.load(html.data);
    
    const res = $('body > div > div > div > div > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1)').text().trim();
    console.log(temp);
    result = res;
    return res;
}

let url = 'https://ramses.kr/compare';
let selector = 'h2 table tbody tr td';

webScraping(url, selector).then((res) => {
  console.log(res)
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/get_market_share', (req, res) => res.json({"result": "success",
                                                    "error_code": "0",
                                                    "data":{
                                                         "market_share": result}
                                                    }))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


result = "15%" //initial value

