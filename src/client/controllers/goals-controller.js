angular.module('GoalPosts.Goals.Controller', [])

.controller('GoalsController', function ($location, $scope, Goals, Auth) {
  $scope.goals = {};

  Goals.getAllGoals()
    .then(function (goals) {
      $scope.goalList = goals.data;
      $(document).ready(function() {
        $('#calendar').fullCalendar({
          events: goals.data.map(function(goal) {
            let goalObj = {};
            goalObj.title = goal.name;
            goalObj.start = goal.dueDate.split('T')[0];
            goalObj.url = '/#!/goals/:' + goal.id;
            return goalObj;
          }),
          eventClick: function(goal) {
            console.log(goal.url);
            $location.url;
          },
          dayClick: function(date, jsEvent, view) {
            return;
          },
          height: 450
        })
        $('#my-next-button').click(function() {
          $('#calendar').fullCalendar('next');
        });
      });
    })
    .catch(function (error) {
      console.error(error);
    });

  $scope.goToAddGoal = function() {
    $location.url('/addGoal');
  }

  $scope.goToDetail = function(id) {
    $location.url('/goals/:' + id);
  }

  $scope.signOut = function() {
    Auth.signout();
  }

})
