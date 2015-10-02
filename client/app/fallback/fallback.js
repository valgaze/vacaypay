(function() {
  'use strict';

  angular.module('app')
  .controller('FallbackController', function ($scope, $modal, $state, Trip) {

    $scope.open = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/createTrip/createTrip.html',
        controller: 'CreateTripController'
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

    $scope.hasTrip();
  });
})();
