(function() {
  'use strict';

  angular.module('app')
  .controller('ExpenseController', function ($scope, $modal, Expenses) {
    $scope.data = {};

    $scope.getExpenses = function() {
      Expenses.allExpenses(function(tripData) {
        $scope.data = tripData[0];
        console.log(tripData);
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