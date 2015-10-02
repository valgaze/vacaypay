(function() {
  'use strict';

  angular.module('app')
  .controller('ExpenseController', function ($scope, $modal, $cacheFactory, Trip) {

    $scope.data = {};

    $scope.getExpenses = function() {
      // The trip data cache has not been set yet so need to call has trip here for now...
      Trip.hasTrip(function(data) {
        Trip.cacheTrip(data);
        var cache = $cacheFactory.get('tripData');
        $scope.data.expenses = cache.get('expenses');
      });
    };
    
    $scope.getExpenses();

    $scope.open = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/createExpense/createExpense.html',
        controller: 'CreateExpenseController'
      });
    };
  })
  
  .controller('ExpenseAccordionController', function ($scope) {
    $scope.oneAtATime = false;
  });

})();