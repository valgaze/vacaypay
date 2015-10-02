(function() {
  'use strict';

  angular.module('app')
  .controller('CreateExpenseController', function ($scope, $rootScope, $modalInstance, $state, $cacheFactory, Expenses) {
    var cache = $cacheFactory.get('tripData');

    $scope.expense = {};
    $scope.participants = cache.get('participants');
    $scope.stakeholders = [];

    $scope.dropdownSettings = {
      smartButtonMaxItems: 5,
      scrollableHeight: '200px',
      scrollable: true
    };

    $scope.buttonText = {
      buttonDefaultText: 'Select Contributors'
    };

    $scope.addExpense = function () {
      Expenses.addExpense($scope.expense, $scope.stakeholders, function () {
        console.log('expense added');
        $rootScope.$broadcast('displayExpense');
        $state.transitionTo('currentTrip.expense');
        $modalInstance.dismiss('Expense has been added');
      });
    };

  });
  
})();