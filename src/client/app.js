angular.module('GoalPosts', [
  'GoalPosts.Auth.Service',
  'GoalPosts.Auth.Controller',
  'GoalPosts.Goals.Service',
  'GoalPosts.Detail.Controller',
  'GoalPosts.GoalForm.Controller',
  'GoalPosts.Goals.Controller',
  'ngRoute'
])


.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/goals', {
      templateUrl: 'views/goals.html',
      controller: 'GoalsController',
      authenticate: true
    })
    .when('/goals/:id', {
      templateUrl: 'views/detail.html',
      controller: 'DetailController',
      authenticate: true
    })
    .when('/addGoal', {
      templateUrl: 'views/goal-form.html',
      controller: 'GoalFormController',
      authenticate: true
    })
    .when('/signin', {
      templateUrl: 'views/login.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'AuthController'
    })

  $httpProvider.interceptors.push('AttachTokens');
})


.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to pause all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.gp');
      if (jwt) object.headers['x-access-token'] = jwt;
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
