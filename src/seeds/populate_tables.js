exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),

    // TODO: DELETE ALL ENTRIES IN EXISITING TABLES

    // Insert seed entries
    knex('users').insert({username: 'alice', password: 'alice'}), // :(
    knex('users').insert({username: 'bob', password: 'bob'}),

    // TODO: INSERT DATA INTO TABLES
  );
};
