var db = require('../config.js');
var Review = require('../models.review.js');

var Reviews = new db.collection();

Reviews.model = Review;

module.exports = Reviews;