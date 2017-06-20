angular.module('GoalPosts.Detail.Controller', [])

.controller('DetailController', function ($location, $scope, Goals) {
  $scope.detail = {};

  Goals.getGoalById($location.$$url.split('/')[2].split(':')[1])
    .then(function (goal) {
      $scope.goal = goal.data[0];
      $scope.dueDate = goal.data[0].dueDate.split('T')[0];
      if (goal.data[0].complete === 'Not complete') {
        $scope.completeMessage = 'Click here to complete this goal';
      } else {
        $scope.completeMessage = 'Congrats! You\'ve completed this goal!'
      }
    })
    .catch(function (error) {
      console.error(error);
    });

    $scope.completeGoal = function() {
      Goals.markAsComplete($location.$$url.split('/')[2].split(':')[1])
      $scope.completeMessage = 'Congrats! You\'ve completed this goal!'
    }

    $scope.returnHome = function () {
      $location.url('/home');
    }
});
