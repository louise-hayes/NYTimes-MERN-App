const express = require("express");
const api = express.Router();
const db = require('../models/')
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
// Route for retrieving all stories from the db
console.log("routes");


api.get('/', (req, res) => {
  res.render('index', {});
});


// get saved articles

api.get("/articles", function (req, res) {
console.log ("api.get(/articles)");
  db.Article
    .find({})
    .then(function (dbArticle) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbArticle);
      // res.render('stories', dbStory);

    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
      //SEND BACK HERE
    });
});

//find one Article - to do - add in .populate (user)
api.get("/articles/:id", function (req, res) {
console.log ("api.get(/articles/:id");
// Find all Notes
  db.Article
    .findOne({
      _id: req.params.id
    })
    .then(function (dbArticle) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbArticle);
      // res.render('stories', dbStory);
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for saving a new Article
api.post("/articles", function (req, res) {
console.log ("api.post(/articles)");
  
  db.Article
    .create(req.body)
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

//route for del of story
api.delete("/articles/:id", function (req, res) {
  console.log("del it");
  db.Story.findByIdAndRemove(req.params.id, function (err, removed) {
      res.json({
        removed: 'article Deleted!'
      });
    })
    .catch(err => {
      console.log(err);
    }); //end findByIdAndRemove
}); //endapp.delete


module.exports = api;