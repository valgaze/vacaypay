(function() {
  'use strict';

  angular.module('app')
  .controller('AuthController', ['$scope', '$window', '$state', 'Auth',
  function ($scope, $window, $state, Auth) {
    $scope.user = {};
    $scope.signinFail = false;
    $scope.signupFail = false;
    //Sign in function and store token into local storage
    //then change state to currentTrip.html
    $scope.signin = function () {

      Auth.signin($scope.user, function (token) {
          $scope.signinFail = false;
          $window.localStorage.setItem('com.vacaypay', token);
          $state.transitionTo('currentTrip.expense');
          $scope.signinForm.$setPristine();
      }, function(res){
        $scope.signinFail = true;
      });
    };
    //Sign up function and store token into local storage
    //then change state to currentTrip.html
    $scope.signup = function () {
      Auth.signup($scope.user, function (token) {

        $scope.signupFail = false;
        $window.localStorage.setItem('com.vacaypay', token);
        $state.transitionTo('currentTrip.expense');
        $scope.signupForm.$setPristine();
      });
      $scope.signupFail = true;
    };
  }]);
})();
