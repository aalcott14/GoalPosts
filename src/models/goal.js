var db = require('./db');

var Goal = {};

Goal.findById = function(id) {
  return db('goals').where({ id: id }).select('*')
    .then(function(goal) {
      return goal;
    });
};

Goal.addNewGoal = function(id_users, name, description, complete, dueDate) {
  return db('goals').insert({ id_users: id_users, name: name, description: description, complete: complete, dueDate:dueDate })
    .then(function(status) {
      return status;
    });
};

Goal.markComplete = function(id) {
  return db('goals').where({ id: id }).update({ complete: 'Complete' })
    .then(function(res) {
      return res;
    });
};

Goal.findAll = function() {
  return db('goals').select('*')
    .then(function(goals) {
      return goals;
    });
};

Goal.findAllGoalsForUser = function(id_users) {
  return db('goals').where({ id_users: id_users }).select('*')
    .then(function(goals) {
      return goals;
    })
};

module.exports = Goal;
