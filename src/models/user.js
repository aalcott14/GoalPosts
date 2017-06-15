var db = require('./db');

var User = {};

User.findByUsername = function(username) {
  return db('users').where({ username: username }).select('*')
    .then(function(user) {
      return user;
    })
    .catch(function(err) {
      console.log('DB ERROR: ', err);
    });
};

User.addNewUser = function(username, password) {
  return db('users').insert({ username: username, password: password })
    .then(function(userId) {
      return db('users').where({ username: username }).select('*')
      .then(function(user) {
        return user;
      })
    })
    .catch(function(err) {
      return err;
    });
}

module.exports = User;
