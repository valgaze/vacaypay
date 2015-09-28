(function() {
  'use strict';

  angular.module('app')
  .factory('Auth', function ($http, $state, $window) {
    var services = {
      signin: signin,
      signup: signup

    };

    return services;

    function signin (user, callback) {
      console.log(user, ' signed in!');
      $http.post('/users/signin', user)
      .then(function (res) {
        console.log('Signed in!');
        callback(res.data.token);
      }, function (res) {
        console.log('Sign in error');
      });
    };

    function signup (user, callback) {
      console.log(user, ' just signed up!');
      $http.post('/users/signup', user)
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

    function signout () {
      $window.localStorage.removeItem('com.vacaypay');
      $state.transitionTo('/signin');
    };

  });
})();