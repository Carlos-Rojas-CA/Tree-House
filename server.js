const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./server/routes')
//const config = require('./server/config');
const logger = require('morgan')
const mongoose = require('mongoose')


const PORT = process.env.PORT || 3001;
const app = express();


// connect to the database and load models
// uses environmental variable for deployment (Heroku) or defaults to local config
// const uri = process.env.MONGODB_URI || "mongodb://etherondb:N3!F85E7wY7ikMF@ds217208.mlab.com:17208/heroku_tqdpxpkx";
const uri = process.env.MONGODB_URI || "mongodb://localhost/tree_house_db";

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
