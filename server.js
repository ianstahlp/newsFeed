 // Dependencies
 var express = require("express");
 var mongojs = require("mongojs");
 // Require request and cheerio. This makes the scraping possible
 var request = require("request");
 var cheerio = require("cheerio");
 //Initialize Express
 var app = express();

 app.use(express.static("public"));

 var databaseUrl = "scraper";
 var collections = ["scrapedData"];
 // Hook mongojs configuration to the db variable
 var db = mongojs(databaseUrl, collections);

 db.on("error", function(error) {
     console.log("Database Error:", error);
 });

app.get("/", function(req, res) {
  res.send("Hello world");
});


 app.get("/all", function(req, res) {

     db.scrapedData.find({}, function(error, found) {

         if (error) {
             console.log(error);
         }
         
         else {
             res.json(found);
         }
     });
 });

 app.get("/scrape", function(req, res) {

     request("https://www.gamespot.com/", function(error, response, html) {


         var $ = cheerio.load(html);


         var results = [];

         $("article.media").each(function(i, element) {

             var img = $(element).find("img").attr("src");

             var title = $(element).find("h3").text();

             //Save the summary of the Article
             var summary = $(element).find("p").text();


             var link = $(element).find("a").attr("href");
             if (img && title && summary && link) {

                 db.scrapedData.insert({
                         img : img,
                         title: title,
                         summary: summary,
                         link: link
                     },
                     function(err, inserted) {
                         if (err) {

                             console.log(err);
                         } else {

                             console.log(inserted);
                         }
                     });
             }
         });




         console.log(results);
     });

 });

 app.listen(3000, function() {
     console.log("App running on port 3000!");
 });