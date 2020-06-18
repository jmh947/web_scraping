const db = require("../models");

const axios = require("axios")

const cheerio = require("cheerio");

function webController(app) {
    app.get("/scrape", function(req, res){
        // axios.get("https://theoatmeal.com/").then(function(results){
        //     const $ = cheerio.load(results.data)
        //     console.log(results.data)
        // })

     db.Article.remove({}).then(function(){
      axios.get("https://theoatmeal.com/blog").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
    
        // Now, we grab every h2 within an article tag, and do the following:
        $("div.center_text a").each(function(i, element) {
          // Save an empty result object
          var result = {};
    
          // Add the text and href of every link, and save them as properties of the result object
          result.Headline = $(this)

            .children("img.box_shadow")
            .attr("alt");

          result.URL = $(this)
             .attr("href");
            result.Image = $(this)
      
            .children("img.box_shadow")
            .attr("src");
    
            if(result.Headline && result.URL && result.Image) {
              db.Article.create(result)
              .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
              })
              .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
              });
            }
          // Create a new Article using the `result` object built from scraping
          
        });
    
        // Send a message to the client
        res.send("Scrape Complete");
      });

     })
    })


    app.put("/api/articles/:id", function(req, res){
      db.Article.update({
        _id: req.params.id
      },{Saved: true}).then(function(results){
        res.json(results)
      })
    })

 
    app.delete("/api/delete/:id", function(req, res){
      db.Article.deleteOne({
        _id: req.params.id
      }).then(article => {
          res.json(article)
        })
    .catch(err => {
      res.json(err)
    })
  
    })

app.delete("/delete/:id", function(req, res){
  db.Article.deleteOne({
    _id: req.params.id
  }).then(article => {
    res.render("savedArticle", {
      Blog: article
    })
  }).catch(err => {
    res.json(err)
  })
})

    app.get("/", function(req, res){
      db.Article.find({Saved: false}).then(function(results){
          const newResults = results.map(blog => {
            return {
              _id: blog._id,
              Headline: blog.Headline,
              URL: blog.URL,
              Image: blog.Image
            }
          })
          res.render("index", {Blog: newResults})
      })
    })

    app.get("/savedArticle", function(req, res){
      db.Article.find({Saved: true}).then(function(results){
          const newResults = results.map(blog => {
            return {
              _id: blog._id,
              Headline: blog.Headline,
              URL: blog.URL,
              Image: blog.Image
            }
          })
          res.render("savedArticle", {Blog: newResults})
      })
    })
}

module.exports = webController