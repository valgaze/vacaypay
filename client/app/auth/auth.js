(function() {
  'use strict';

  angular.module('app')
  .controller('AuthController', function ($scope, $window, $location, Auth) {
    $scope.user = {};

    $scope.signin = function () {
      Auth.signin($scope.user, function (token) {
          $window.localStorage.setItem('com.vacaypay', token);
          $location.path('/home');
          $scope.signinForm.$setPristine();
      });
    };

    $scope.signup = function () {
      Auth.signup($scope.user, function (token) {
          $window.localStorage.setItem('com.vacaypay', token);
          $location.path('/home');
          $scope.signupForm.$setPristine();   
      });
    };

  });





})();

