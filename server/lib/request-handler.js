var db = require('../../db/config');
var bcrypt = require('bcrypt-nodejs');

var Users = require('../../db/app/collections/users');
var Reviews = require('../../db/app/collections/reviews');
var User = require('../../db/app/models/user');
var Review = require('../../db/app/models/review');

exports.loginUser = function(req, res) {
  console.log(req.body);
  res.status(201).send('User Logged In');
};

exports.logoutUser = function(req, res) {
  res.status(200).send('User Logged Out');
};