exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('id').primary();
      table.string('username');
      table.string('password');
    }),

    knex.schema.createTableIfNotExists('goals', function (table) {
      table.increments('id').primary();
      table.integer('id_users')
        .references('id')
        .inTable('users');
      table.string('name');
      table.string('description');
      table.string('complete');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('goals'),
  ])
};
