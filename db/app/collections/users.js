var db = require('../config.js');
var User = require('../models/user.js');

var Users = new db.collection();

Users.model = User;

module.exports = Users;