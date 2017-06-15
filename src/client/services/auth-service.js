angular.module('GoalPosts.Auth.Service', [])
.factory('Auth', function ($http, $location, $window) {
  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.gp');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.gp');
    $location.path('/signin');
  };

  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
