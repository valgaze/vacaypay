(function() {
  'use strict';

  angular.module('app')
  .controller('AuthController', function ($scope, $window, $state, Auth) {
    $scope.user = {};

    $scope.signin = function () {
      Auth.signin($scope.user, function (token) {
          $window.localStorage.setItem('com.vacaypay', token);
          $state.transitionTo("currentTrip.expense")
          $scope.signinForm.$setPristine();
      });
    };

    $scope.signup = function () {
      Auth.signup($scope.user, function (token) {
          $window.localStorage.setItem('com.vacaypay', token);
          $state.transitionTo("currentTrip.expense");
          $scope.signupForm.$setPristine();   
      });
    };
  });






})();

