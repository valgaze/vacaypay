(function() {
  'use strict';

  angular.module('app')
  .controller('FallbackController', function ($scope, $modal) {

    $scope.open = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/createTrip/createTrip.html',
        controller: 'CreateTripController'
      });
    };

  });

})();