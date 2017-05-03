var db = require('../../db/config');
var bcrypt = require('bcrypt-nodejs');

var Users = require('../../db/app/collections/users');
var Reviews = require('../../db/app/collections/reviews');
var User = require('../../db/app/models/user');
var Review = require('../../db/app/models/review');

exports.sendReview = function(req, res) {
  var user = req.body.user;
  var review = req.body.review;
  var place = req.body.place;

  Reviews.create({
    user: user,
    review: review,
    place: place
  })
  .then(function(review) {
    res.status(200).send('Review Created!');
  });
};

exports.getReviewsByUser = function(req, res) {
  new Review({}).fetchAll().then(function(reviews) {
    res.status(200).json(reviews);
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({ user_name: username }).fetch().then(function(user) {
    if ( user ) {
      user.checkPassword(password, function(isCorrect) {
        if ( isCorrect ) {
          res.status(200).json(user);
        }
      });
    } else {
      res.status(200).send('Invalid User.');
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
      res.status(200).send('Name Taken.');
    } else {
      Users.create({
        user_name: username,
        password: password
      })
      .then(function(user) {
        res.status(200).send('Created!');
      });
    }
  });
};

exports.logoutUser = function(req, res) {
  res.status(200).send('User Logged Out');
};