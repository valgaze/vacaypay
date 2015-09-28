(function() {
  'use strict';

  angular.module('app')
  .controller('ExpenseController', function ($scope, $modal, Expenses) {
    $scope.data = {};

    $scope.getExpenses = function() {
      Expenses.allExpenses()
      .then(function (expenses) {
        $scope.data.expenses = expenses;
      })
      .catch(function (err) {
        console.error(err);
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
  
  .controller('CollapseDemoCtrl', function ($scope) {
  $scope.isCollapsed = false;
  });

})();