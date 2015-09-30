(function() {
  'use strict';

  angular.module('app')
  .controller('ExpenseController', function ($scope, $modal, $cacheFactory, Trip) {
    $scope.data = {};

    $scope.getExpenses = function() {
      Trip.getTrip(function (tripDataCache) {
        $scope.data.expenses = tripDataCache.get('expenses');
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