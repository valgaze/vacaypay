(function() {
  'use strict';

  angular.module('app')
  .controller('AuthController', function ($scope, $window, $location, Auth) {
    $scope.user = {};

    $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.shortly', token);
          $location.path('/links');
          $scope.signinForm.$setPristine();
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signup = function () {
      Auth.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.shortly', token);
          $location.path('/links');
          $scope.signupForm.$setPristine();
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  });





})();

