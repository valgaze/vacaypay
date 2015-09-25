(function() {
  'use strict';

  angular.module('app')
  .controller('FallBackController', function ($scope, $modal) {

    $scope.open = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '../createTrip/createTrip.html',
        controller: '../createTrip/createTrip.js',
        size: 'lg'
        // resolve: {
        //   items: function () {
        //     return $scope.items;
        //   }
        // }
      });
    };

  });

})();