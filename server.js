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
     // Find all results from the scrapedData collection in the db
     db.scrapedData.find({}, function(error, found) {
         // Throw any errors to the console
         if (error) {
             console.log(error);
         }
         // If there are no errors, send the data to the browser as json
         else {
             res.json(found);
         }
     });
 });

 app.get("/scrape", function(req, res) {
     // Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
     request("https://www.gamespot.com/", function(error, response, html) {

         // Load the HTML into cheerio and save it to a variable
         // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
         var $ = cheerio.load(html);

         // An empty array to save the data that we'll scrape
         var results = [];

         // With cheerio, find each p-tag with the "title" class
         // (i: iterator. element: the current element)
         $("article.media").each(function(i, element) {

             // Save the text of the element in a "title" variable
             var title = $(element).find("h3").text();

             //Save the summary of the Article
             var summary = $(element).find("p").text();

             // In the currently selected element, look at its child elements (i.e., its a-tags),
             // then save the values for any "href" attributes that the child elements may have

             var link = $(element).find("a").attr("href");

             // Save these results in an object that we'll push into the results array we defined earlier
             // If this found element had both a title and a link
             if (_id && title && summary && link) {
                 // Insert the data in the scrapedData db
                 db.scrapedData.insert({
                         title: title,
                         summary: summary,
                         link: link
                     },
                     function(err, inserted) {
                         if (err) {
                             // Log the error if one is encountered during the query
                             console.log(err);
                         } else {
                             // Otherwise, log the inserted data
                             console.log(inserted);
                         }
                     });
             }
         });



         // Log the results once you've looped through each of the elements found with cheerio
         console.log(results);
     });

 });

 app.listen(3000, function() {
     console.log("App running on port 3000!");
 });