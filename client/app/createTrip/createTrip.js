(function() {
  'use strict';

  angular.module('app')
  .controller('CreateTripController', function ($scope, Trip, $location) {
    $scope.trip = {};
    $scope.createTrip = function() {
      Trip.createTrip($scope.trip)
      .then(function() {
        $location.path('/currentTrip');
      });
    };

  });

})();