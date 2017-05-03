var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./lib/request-handler');
var cors = require('cors');
var requestHandler = require('./lib/request-handler');
var util = require('./lib/util');

var app = express();

// Reach
// var session = require('express-session');

app.use(cors());
app.use(bodyParser.json());


// Routes //

// Main Page
app.get('/', function(req, res) {
  res.send(200, "Test");
});

// Create User
app.post('/createuser', requestHandler.createUser);

// Authentication
app.post('/login', requestHandler.loginUser);
app.post('/logout', requestHandler.logoutUser);

// Reviews
app.post('/reviews', requestHandler.sendReview);
app.get('/reviews', requestHandler.getReviewsByUser)

module.exports = app;