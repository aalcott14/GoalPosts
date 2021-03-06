angular.module('GoalPosts.GoalForm.Controller', [
  'ngMaterial'
])

.controller('GoalFormController', function ($location, $scope, Goals, Auth) {
  this.myDate = new Date();
  this.isOpen = false;

  $scope.goalForm = {};

  $scope.returnHome = function() {
    $location.url('/home');
  }

  $scope.addGoal = function() {
    Goals.addGoal($scope.name, $scope.description, 'Not complete', $scope.dueDate)
    .then(function(res) {
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

  $scope.signOut = function() {
    Auth.signout();
  }
})
