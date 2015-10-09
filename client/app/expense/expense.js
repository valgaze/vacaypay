(function() {
  'use strict';

  angular.module('app')
  .controller('ExpenseController', ['$scope', '$modal', '$cacheFactory', 'Trip',
  function ($scope, $modal, $cacheFactory, Trip) {

    $scope.data = {};

    $scope.getExpenses = function() {
      // The trip data cache has not been set yet so need to call has trip here for now...
      Trip.hasTrip(function(data) {
        Trip.cacheTrip(data);
        var cache = $cacheFactory.get('tripData');
        $scope.data.expenses = cache.get('expenses');
        $scope.findCenter();
        if ($scope.data.center && $scope.map !== undefined){
          $scope.map.setCenter($scope.data.center);
        }
      });
    };

    $scope.findCenter = function() {
      var center = {location:{lat:37.7833,lng:-122.4167}};
      if ($scope.data.expenses.length!==0){
        center = $scope.data.expenses.reduce(function(previousValue,currentValue){
          var result = {
            location: {
              lat: previousValue.location.lat+currentValue.location.lat,
              lng: previousValue.location.lng+currentValue.location.lng
            }
          };
          return result;
        });
        center.location.lat = center.location.lat/$scope.data.expenses.length;
        center.location.lng = center.location.lng/$scope.data.expenses.length;
      }
      $scope.data.center = center.location;
    };


    $scope.$on('mapInitialized', function(evt, evtMap) {
        $scope.map = evtMap;
        $scope.getExpenses();
      });

    $scope.open = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/createExpense/createExpense.html',
        controller: 'CreateExpenseController'
      });

      modalInstance.result.then(function(expenses) {
        $scope.data.expenses = expenses;
        if ($scope.data.center !== undefined && $scope.map !== undefined){
          $scope.findCenter();
          $scope.map.setZoom(5);
          $scope.map.setCenter($scope.data.center);
        }
      });
    };
  }])
  
  .controller('ExpenseAccordionController', ['$scope', function ($scope) {
    $scope.oneAtATime = false;
  }]);
})();