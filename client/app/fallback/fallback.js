(function() {
  'use strict';

  angular.module('app')
  .controller('FallbackController', ['$scope', '$http', '$modal', '$state', '$window', 'Trip', 'Auth',
  function ($scope, $http, $modal, $state, $window, Trip, Auth) {

    $scope.tripCode = '';
    $scope.recentTrip;
    $scope.totalExpenses;
    $scope.hasRecentTrip = false;
    $scope.username = $window.localStorage.getItem('username');

    $scope.logout = function() {
      Auth.signout();
    };

    $scope.open = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/createTrip/createTrip.html',
        controller: 'CreateTripController'
      });
    };

    $scope.joinTrip = function() {
      Trip.joinTrip($scope.tripCode, function(data) {
        if (!data.problem){
          $state.transitionTo('currentTrip.expense');          
        }else{
          $scope.error = true;
        }

      });
    };

    $scope.hasTrip = function () {
      Trip.hasTrip( function (data) {
        $scope.data = data;
        if ($scope.data.name) {
          $state.transitionTo('currentTrip.expense');
        }
      });
    };

    $scope.getRecentTrip = function () {
      Trip.getRecentTrip(function (mostRecentTrip) {
        if (mostRecentTrip) {
          $scope.recentTrip = mostRecentTrip;
          totalExpenses();
          $scope.hasRecentTrip = true;
        }
      });
    };

    var totalExpenses = function() {
      $scope.totalExpenses =  $scope.recentTrip.expenses.reduce(function(total, current) {
        return total + parseInt(current.amount);
      }, 0);
    };

    $scope.hasTrip();
    $scope.getRecentTrip();
  }]);
})();
