(function() {
  'use strict';

  angular.module('app')
  .controller('CreateExpenseController', function ($scope, $modalInstance, $state, Expense) {
    $scope.expense = {};
    $scope.addExpense = function() {
      console.log($scope.expense);
      Expense.createExpense($scope.expense, function() {
        console.log('called back!');
        $modalInstance.dismiss('Expense has been added');
        $state.transitionTo('currentTrip');
      });
    };

  });
  
})();