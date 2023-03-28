console.log("Express Tutorial");

const axios = require('axios')
const cheerio = require('cheerio')
const express = require("express")

const app = express()
const url = "https://www.theguardian.com/uk"

axios(url).then((properties) => {
    const data = properties.data
    const $ = cheerio.load(data);
    const documents = []
    $('.fc-item__title',data).each(function(){
       const Text = $(this).text();
       const info = $(this).find('a').attr("href");
       documents.push({Text,info})
    })
    console.log(documents);
}).catch((err) => {
    console.log(err);
});
const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("Listening to server..");
})

