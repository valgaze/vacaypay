(function() {
  'use strict';

  angular.module('app')
  .factory('Auth', function ($http) {
    var services = {
      signin: signin,
      signup: signup

    };

    return services;

    function signin (user, callback) {
      console.log(user, ' signed in!');
      $http.post('/users', {username: user})
      .then(function (res) {
        console.log('Signed in!');
        callback(res.data.token);
      }, function (res) {
        console.log('Sign in error');
      });
    };

    function signup (user, callback) {
      console.log(user, ' just signed up!');
      $http.post('/users', {username: user})
      .then(function (res) {
        console.log('Signed up!');
        callback(res.data.token);
      }, function (res) {
        console.log('Error during sign up');
      });
    };

    function isAuth () {
      return !!$window.localStorage.getItem('com.vacaypay');
    };

    function signout = function () {
      $window.localStorage.removeItem('com.vacaypay');
      $location.path('/signin');
    };

  });


})();