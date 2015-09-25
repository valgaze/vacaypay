(function() {
  'use strict';

  angular.module('app')
  .controller('ExpenseController', function ($scope, Expenses) {
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
  })
  
  .controller('CollapseDemoCtrl', function ($scope) {
  $scope.isCollapsed = false;
  });

})();