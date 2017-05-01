var db = require('../config.js');
var Favorite = require('../models/favorite.js');

var Favorites = new db.collection();

Favorites.model = Favorite;

module.exports = Favorites;