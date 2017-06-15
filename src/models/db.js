var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./db.sqlite3"
  }
});

module.exports = knex;
