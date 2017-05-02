var db = require('../../db/config');
var bcrypt = require('bcrypt-nodejs');

var Users = require('../../db/app/collections/users');
var Reviews = require('../../db/app/collections/reviews');
var User = require('../../db/app/models/user');
var Review = require('../../db/app/models/review');

exports.loginUser = function(req, res) {
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;

  console.log(username, password);

  new User({ user_name: username }).fetch().then(function(user) {
    if ( user ) {
      user.checkPassword(password, function(isCorrect) {
        if ( isCorrect ) {
          res.status(201).json(user);
        }
      });
    } else {
      res.status(201).send('Invalid User.');
    }
  });

};

exports.createUser = function(req, res) {
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;

  console.log(username, password);

  new User({ user_name: username, password: password }).fetch().then(function(found) {
    if ( found ) {
      res.status(200).json(found);
    } else {
      Users.create({
        user_name: username,
        password: password
      })
      .then(function(user) {
        res.status(200).send('Created!')
      });
    }
  })
}

exports.logoutUser = function(req, res) {
  res.status(200).send('User Logged Out');
};