// load environment properties from a .env file for local development
// require('dotenv').load({
//     silent: true
//   });
  const express = require('express');
  const api = require('./routes/routes.js');
  const db = require("./models");
  const mongoose = require("mongoose");
  const bodyParser = require("body-parser");
  const app = express();
  const path=require('path'); 
  // Deployment tracking
  
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
 
 app.use(express.static(path.join(__dirname, './build')));
  app.use('/', api);
  const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
  
  // Set mongoose to leverage built in JavaScript ES6 Promises
  // Connect to the Mongo DB
  // Database configuration with mongoose
  var databaseUri = "mongodb://localhost/ArticlesNY";
  
  if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
  } else {
    mongoose.connect(databaseUri);
  }
  
  var dbase = mongoose.connection;
  
  // Show any mongoose errors
  dbase.on("error", function (error) {
    console.log("Mongoose Error: ", error);
  });
  
  // Once logged in to the db through mongoose, log a success message
  dbase.once("open", function () {
    console.log("Mongoose connection successful.");
  });
  
  app.listen(port);
  console.log('listening at:', port);
  