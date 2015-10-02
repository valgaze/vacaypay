(function() {
  'use strict';

  angular.module('app')
  .controller('CreateTripController', function ($scope, $location, $modalInstance, $state, Trip) {
    $scope.trip = {};
    $scope.createTrip = function() {
      Trip.createTrip($scope.trip, function() {
        console.log('called back!');
        $modalInstance.dismiss('Trip has been created');
        $state.transitionTo('currentTrip.expense'); 
      });
    };

  });

})();