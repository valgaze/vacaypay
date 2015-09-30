(function() {
  'use strict';

  angular.module('app')
  .controller('FallbackController', function ($scope, $modal, $cacheFactory, Trip) {

    var tripDataCache = $cacheFactory.get('$http');

    console.log('Trip ID:', Trip.currentTripId);

    $scope.open = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/createTrip/createTrip.html',
        controller: 'CreateTripController'
      });
    };

  });

})();