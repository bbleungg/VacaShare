var db = require('../../config.js');
var User = require('./user');

var Review = db.Model.extend({
  tableName: 'reviews',
  hasTimestamps: true,

  users: function() {
    return this.belongsTo(User);
  },

  initialize: function() {
  }

});