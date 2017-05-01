var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./lib/request-handler');
var cors = require('cors');

var app = express();

// Reach
// var session = require('express-session');
app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send(200, "Test");
});


module.exports = app;