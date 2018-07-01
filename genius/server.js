// Load environment variables
require('dotenv').config();

// grab our dependencies
const express = require('express'),
  app = express(),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 9090,
  expressLayouts = require('express-ejs-layouts');
  //mongoose = require('mongoose');

// configure our application
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);


// set the routes
app.use(require('./app/routes'));

// start our server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});