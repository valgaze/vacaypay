(function() {
  'use strict';

  angular.module('app')
  .controller('PastTripController', function ($scope, PastTrips) {
    $scope.data = {};

    $scope.getPastTrips = function() {
      PastTrips.allPastTrips(function(pastTripData) {
        $scope.data.pastTrips = pastTripData;
        console.log(pastTripData);
      });
    };
    $scope.getPastTrips();

  })
  
  .controller('PastTripAccordionController', function ($scope) {
    $scope.oneAtATime = false;
  });

})();