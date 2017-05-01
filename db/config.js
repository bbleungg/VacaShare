var path = require('path');
var knex = require('knex');

knex.({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './vacashare.sqlite')
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if ( !exists ) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('user_id').primary();
      user.string('user_name', 20).unique();
      user.string('password', 20);
    });
  }
});

db.knex.schema.hasTable('reviews').then(function(exists) {
  if ( !exists ) {
    db.knex.schema.createTable('reviews', function(review) {
      review.increments('review_id').primary();
      review.string('review', 1000);
      review.string('place');
      review.foreign('user').references('user_id').inTable('users');
    });
  }
});

db.knex.schema.hasTable('favorite_reviews').then(function(exists) {
  if ( !exists ) {
    db.knex.schema.createTable('favorite_reviews', function(favorite) {
      favorite.foreign('user').references('user_id').inTable('users');
      favorite.foreign('review').references('review_id').inTable('reviews').onDelete('cascade');
    });
  }
});

module.exports = db;