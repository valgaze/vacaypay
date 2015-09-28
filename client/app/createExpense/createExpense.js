(function() {
  'use strict';

  angular.module('app')
  .controller('CreateExpenseController', function ($scope, $modalInstance, $state, Expenses, Trip) {
    $scope.expense = {};
    $scope.participants;
    $scope.stakeholders = [];

    $scope.dropdownSettings = {
      smartButtonMaxItems: 5,
      scrollableHeight: '100px',
      scrollable: true
    };

    $scope.buttonText = {
      buttonDefaultText: 'Select Contributors'
    };

    $scope.addExpense = function() {
      console.log($scope.expense);
      Expenses.addExpense($scope.expense, function() {
        console.log('called back!');
        $modalInstance.dismiss('Expense has been added');
        $state.transitionTo('currentTrip');
      });
    };

    $scope.getParticipants = function() {
      Trip.hasTrip()
      .then(function (trip) {
        $scope.participants = trip.participants;
      })
      .catch(function (err) {
        console.error(err);
      });
    };


  });
  
})();