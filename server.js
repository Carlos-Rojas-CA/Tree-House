// import express from "express"
// // const express = require("express");
// import {Express, Request, Response} from "express"
// import path from "path"
// import bodyParser from 'body-parser'
// import passport from 'passport'
// import routes from './server/routes'
// //import config from './server/config')
// import logger from 'morgan'
// import mongoose from 'mongoose'
// const scrapeData = require('./scrapper')
// // import scrapeData from './scrapper'


// const PORT = process.env.PORT || 3001;
// const app = express();
// //


// // connect to the database and load models
// // uses environmental variable for deployment (Heroku) or defaults to local config
// // const uri = process.env.MONGODB_URI || "mongodb://user:AppleTre3@ds011800.mlab.com:11800/heroku_0f45kwwd";
// const uri = process.env.MONGODB_URI || "mongodb://localhost/tree_house_db";

// mongoose.connect(uri);
// // plug in the promise library:
// mongoose.Promise = global.Promise;

// mongoose.connection.on('error', (err) => {
// 	console.error(`Mongoose connection error: ${err}`);
// 	process.exit(1);
// });

// // Use morgan logger for logging requests
// app.use(logger("dev"));

// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// // tell the app to parse HTTP body messages
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// // pass the passport middleware
// app.use(passport.initialize());

// // load passport strategies
// const localSignupStrategy = require('./server/passport/local-signup');
// const localLoginStrategy = require('./server/passport/local-login');
// passport.use('local-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);

// // pass the authenticaion checker middleware
// import authCheckMiddleware from './server/middleware/auth-check'
// app.use('/api', authCheckMiddleware);
// app.post('/scrape', async(req: Request, res: Response) => {
//   console.log(req.body.url)
//   var data: JSON;
//   await console.log(scrapeData(req.body.url));
//   data = await scrapeData(req.body.url)
//   res.send(data)
//   // res.send(req.body.url)
// } )
// app.get("/apple", (req: Request, res: Response):void => {
//   console.log("apples")
//   res.send(req.body.url)
// })
// // routes

// app.use(routes)


// // Send every request to the React app
// // Define any API routes before this runs


// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// app.listen(PORT, function() {
//   console.log(`🌎 ==> API server now on port ${PORT}!`);
// });



/////////////////////////////////////////////////////
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./server/routes')
const config = require('./server/config');
const logger = require('morgan')
const mongoose = require('mongoose')
const scrapeData = require('./scrapper')

const PORT = process.env.PORT || 3001;
const app = express();


// connect to the database and load models
// uses environmental variable for deployment (Heroku) or defaults to local config
const uri = process.env.MONGODB_URI || "mongodb://user:AppleTre3@cluster-0f45kwwd-shard-00-00.tetzg.mongodb.net:27017,cluster-0f45kwwd-shard-00-01.tetzg.mongodb.net:27017,cluster-0f45kwwd-shard-00-02.tetzg.mongodb.net:27017/heroku_0f45kwwd?ssl=true&replicaSet=atlas-ktu3ca-shard-0&authSource=admin&retryWrites=true&w=majority";
// const uri = process.env.MONGODB_URI || "mongodb://localhost/tree_house_db";

mongoose.connect(uri);
// plug in the promise library:
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
	console.error(`Mongoose connection error: ${err}`);
	process.exit(1);
});

// Use morgan logger for logging requests
app.use(logger("dev"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);
app.post('/scrape', async(req, res) => {
  console.log(req.body.url)
  var data;
  await console.log(scrapeData(req.body.url));
  data = await scrapeData(req.body.url)
  res.send(data)
  // res.send(req.body.url)
} )
app.get("/apple", (req, res) => {
  res.json("You have my apples!")
})

// routes

app.use(routes)

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
