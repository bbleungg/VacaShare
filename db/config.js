var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './vacashare.sqlite')
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

// Users
db.knex.schema.hasTable('users').then(function(exists) {
  if ( !exists ) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('user_id').primary();
      user.string('user_name', 20).unique();
      user.string('password', 20);
      user.timestamps();
    })
    .then(function(table) {
      console.log('Table Created:', 'Users');
    });
  }
});

// Reviews
db.knex.schema.hasTable('reviews').then(function(exists) {
  if ( !exists ) {
    db.knex.schema.createTable('reviews', function(review) {
      review.increments('review_id').primary();
      review.string('review', 1000);
      review.string('place');
      review.integer('user').references('user_id').inTable('users');
      review.timestamps();
    })
    .then(function(table) {
      console.log('Table Created:', 'Reviews');
    });
  }
});

// Favorite Reviews Junction
// db.knex.schema.hasTable('favorite_reviews').then(function(exists) {
//   if ( !exists ) {
//     db.knex.schema.createTable('favorite_reviews', function(favorite) {
//       favorite.foreign('user').references('user_id').inTable('users');
//       favorite.foreign('review').references('review_id').inTable('reviews').onDelete('cascade');
//     })
//     .then(function(table) {
//       console.log('Table Created:', table);
//     });
//   }
// });

module.exports = db;