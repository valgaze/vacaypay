(function() {
  'use strict';

  angular.module('app')
  .controller('CreateTripController', function ($scope, $location, $modalInstance, Trip) {
    $scope.trip = {};
    $scope.createTrip = function() {
      console.log($scope.trip);
      Trip.createTrip($scope.trip, function() {
        console.log('called back!');
        $modalInstance.dismiss('Trip has been created');
        $location.path('/currentTrip');
      });
    };

  });

})();