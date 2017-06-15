angular.module('GoalPosts.Goals.Service', [])

// TODO: Create a factory which provides $http functionality for Goals in other parts of the app.
.factory('Goals', function ($http) {
  var addGoal = function (name, description, complete, dueDate) {
    return $http({
      method: 'POST',
      url: '/api/goals',
      data: {name: name, description: description, complete: complete, dueDate: dueDate}
    })
    .then(function (resp) {
      return resp;
    });
  };

  var getAllGoals = function() {
    return $http({
      method: 'GET',
      url: '/api/goals',
    })
    .then(function (res) {
      return res;
    });
  };

  var getGoalById = function(id) {
    return $http({
      method: 'GET',
      url: '/api/goals/' + id
    })
    .then(function (res) {
      return res;
    });
  };

  var markAsComplete = function(id) {
    return $http({
      method: 'POST',
      url: '/api/goals/' + id
    })
  }

  return {
    addGoal: addGoal,
    getAllGoals: getAllGoals,
    getGoalById: getGoalById,
    markAsComplete: markAsComplete
  };

});
