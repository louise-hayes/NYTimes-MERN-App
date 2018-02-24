const express = require("express");
const api = express.Router();
const db = require('../models/')
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
// Route for retrieving all stories from the db



api.get('/', (req, res) => {
  res.render('index', {});
});


// NY TIMES API GET
api.get('/nytimes', (req, res) => {
    // const BASEURL = "https://www.omdbapi.com/?t=";
    // const APIKEY = "&apikey=trilogy";
    console.log("ny times route");
    console.log(req.body);
    const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=27ee0cab99f04488b45526b7bae42efe";
    var query
    var searchQ = req.body.searchTerm;
    var limitAmt = req.body.noToRetrieve;
    var endY = req.body.endYear;
    var startY = req.body.startYear;


    if (searchQ === "") {
      alert("Search terms are required.");
      return;
    }

    BASEURL += "&q=" + searchQ;

    if (endY !== "") {
      endY = endY + "1231";
      BASEURL += "&end_date=" + endY;
    }

    if (startY !== "") {
      startY = startY + "0101";
      BASEURL += "&start_date=" + startY;
    }

    if (limitAmt === "") {
      limitAmt = 10;
    }

    BASEURL += "&limit=" + limitAmt;

    // $.ajax({
    //   BASEURL: url,
    //     method: 'GET',
    // }).done(function (result) {

    export default {
      search: function (query) {
        return axios.get(BASEURL + query);
        console.log("nytimes search");
        // return axios.get(BASEURL + query + APIKEY);

      }
    };

  })
  .catch(err => {
    res.send(err);
    console.log("nytimes GET error");
  });







// get saved articles

api.get("/articles", function (req, res) {
  // Find all Notes
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
api.delete("/stories/:id", function (req, res) {
  console.log("del it");
  db.Story.findByIdAndRemove(req.params.id, function (err, removed) {
      res.json({
        removed: 'story Deleted!'
      });
    })
    .catch(err => {
      console.log(err);
    }); //end findByIdAndRemove
}); //endapp.delete


module.exports = api;