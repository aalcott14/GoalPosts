angular.module('GoalPosts.GoalForm.Controller', [])

.controller('GoalFormController', function ($location, $scope, Goals) {
  $scope.goalForm = {};

  $scope.returnHome = function() {
    $location.url('/goals');
  }

  $scope.addGoal = function() {
    Goals.addGoal($scope.name, $scope.description, 'Not complete', $scope.dueDate)
    .then(function(res) {
      console.log(res)
      if (res.status = 200) {
        $scope.successMessage = 'Goal successfully added!';
      }
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(function() {
      $scope.name = '';
      $scope.description = '';
      $scope.dueDate = '';
    });
  }
})
