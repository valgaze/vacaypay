(function() {
  'use strict';

  angular.module('app')
  .controller('CurrentTripController', function ($scope, $location, $state, Trip) {
    $scope.currentTrip = {};

    $scope.hasTrip = function () {
      Trip.hasTrip( function (data) {
        $scope.data = data;
        if (!$scope.data.name) {
          $state.transitionTo('fallback');
        }
      });
    };

    $scope.hasTrip();


  });
  
})();