const db = require("../models");

const axios = require("axios")

const cheerio = require("cheerio");

function webController(app) {
    app.get("/scrape", function(req, res){
        // axios.get("https://theoatmeal.com/").then(function(results){
        //     const $ = cheerio.load(results.data)
        //     console.log(results.data)
        // })

        axios.get("http://www.echojs.com/").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
        
            // Now, we grab every h2 within an article tag, and do the following:
            $("article h2").each(function(i, element) {
              // Save an empty result object
              var result = {};
        
              // Add the text and href of every link, and save them as properties of the result object
              result.Headline = $(this)
                .children("a")
                .text();
              result.URL = $(this)
                .children("a")
                .attr("href");
        
              // Create a new Article using the `result` object built from scraping
              db.Article.create(result)
                .then(function(dbArticle) {
                  // View the added result in the console
                  console.log(dbArticle);
                })
                .catch(function(err) {
                  // If an error occurred, log it
                  console.log(err);
                });
            });
        
            // Send a message to the client
            res.send("Scrape Complete");
          });


        // res.send("scrapping is completed")
    })
}

module.exports = webController