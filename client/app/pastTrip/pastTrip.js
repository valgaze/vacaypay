(function() {
  'use strict';

  angular.module('app')
  .controller('PastTripController', ['$scope', 'PastTrips', function ($scope, PastTrips) {
    $scope.data = {};

    $scope.getPastTrips = function() {
      PastTrips.allPastTrips(function(pastTripData) {
        $scope.data.pastTrips = pastTripData;
        console.log(pastTripData);
      });
    };
    $scope.getPastTrips();

  }])
  
  .controller('PastTripAccordionController', ['$scope', function ($scope) {
    $scope.oneAtATime = false;
  }]);
})();