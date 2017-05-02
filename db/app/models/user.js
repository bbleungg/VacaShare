var db = require('../../config.js');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var Review = require('./review');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  reviews: function() {
    return this.hasMany(Review);
  },

  initialize: function() {
    this.on('creating', this.hashFunction);
  },

  hashFunction: function() {
    return new Promise( (resolve, reject) => {
      bcrypt.hash(this.get('password'), null, null, (err, hashed) => {
        if ( err ) {
          reject(err)
        } else {
          resolve(hashed);
        }
      });
    }).bind(this)
      .then(function(hashed) {
        this.set('password', hashed);
      });
  },

  checkPassword: function(inputPW, callback) {
    bcrypt.compare(inputPW, this.get('password'), (err, isCorrect) => {
      callback(isCorrect);
    });
  }
});

module.exports = User;