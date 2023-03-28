console.log("Express Tutorial");

const axios = require('axios')
const cheerio = require('cheerio')
const express = require("express")

const app = express()



 async function getmarketCap() {
try {
    const baseURL = "https://coinmarketcap.com/"

    const getData = await axios({
        method: "GET",
        url : baseURL,  
    })
  const data = getData.data
  const $ = cheerio.load(data)
  const elementbody = "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div:nth-child(1) > div.sc-beb003d5-2.bkNrIb > table > tbody > tr"
 
      const keys = [
        "rank",
        "name",
        "price",
        "24h",
        "7d",
        "marketCap",
        "volume",
        "circulatingSupply",
        "last 7d"
      ]

      const coinArr = [];
 
          $(elementbody).each((parentIdx,parentElem)=> {
            let keysIdx = 0;
            const coinObj = [];
        if(parentIdx <= 9){
          $(parentElem).children().each((childrenIdx,childrenElem)=> {
            let tdValue = $(childrenElem).text();
            
          if(keysIdx == 1 || keysIdx == 6){
            tdValue = $("p:first-child",$(childrenElem).html()).text()
          }

          if(tdValue){
            coinObj[keys[keysIdx]] = tdValue
            keysIdx++
          } 
          });
          coinArr.push(coinObj);
            }
        })

     return coinArr

        } catch (error) {
            console.error(error);
        }}

    app.get("/api/coin-prices",async(req,res)=> {
    try {
      let upload = [];
       upload = await getmarketCap()
      console.log(upload);
     return res.status(200).json({upload})
    } catch (err) {
      res.status(404).json({
        "err" : err  .toString() 
      })
    }
    });

    app.listen(3000,()=> {
      console.log("Server is running listening on port 3000");
    })