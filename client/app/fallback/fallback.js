(function() {
  'use strict';

  angular.module('app')
  .controller('FallbackController', function ($scope, $http, $modal, $state, Trip) {

    $scope.tripCode = "";
    $scope.recentTrip;
    $scope.totalExpenses;

    $scope.open = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/createTrip/createTrip.html',
        controller: 'CreateTripController'
      });
    };

    $scope.joinTrip = function() {
      Trip.joinTrip($scope.tripCode, function() {
        $state.transitionTo('currentTrip.expense');
      });
    }

    $scope.hasTrip = function () {
      Trip.hasTrip( function (data) {
        $scope.data = data;
        if ($scope.data.name) {
          $state.transitionTo('currentTrip.expense');
        }
      });
    };

    $scope.getRecentTrip = function () {
      Trip.getRecentTrip(function (recentTrip) {
        $scope.recentTrip = recentTrip;
        totalExpenses();
      });
    }

    var totalExpenses = function() {
      $scope.totalExpenses =  $scope.recentTrip.expenses.reduce(function(total, current) {
        return total + parseInt(current.amount);
      }, 0);
    }

    $scope.hasTrip();
    $scope.getRecentTrip();
  });
})();
