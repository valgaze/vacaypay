(function() {
  'use strict';

  angular.module('app')
  .controller('CreateExpenseController', function ($scope, $rootScope, $modalInstance, $state, $cacheFactory, Expenses) {
    var cache = $cacheFactory.get('tripData');

    $scope.expense = {};
    var participants = cache.get('participants');

    // Partiicpants is mapped to format it in a way that the dropdown menu can understand.
    $scope.participants = participants.map(function(participant) {
      return { id: participant.id, label: participant.username };
    });

    // $scope.stakeholders is the model that the dropdown menu creates.
    $scope.stakeholders = [];

    // Configures the dropdown menu
    // http://dotansimha.github.io/angularjs-dropdown-multiselect/#/
    $scope.dropdownSettings = {
      smartButtonMaxItems: 5,
      scrollableHeight: '200px',
      scrollable: true,
      externalIdProp: ''
    };

    $scope.buttonText = {
      buttonDefaultText: 'Select Contributors'
    };

    $scope.addExpense = function () {
      // Return the data back to the server in the correct format
      $scope.stakeholders = $scope.stakeholders.map(function(stakeholder) {
        return { id: stakeholder.id, username: stakeholder.label };
      });
      Expenses.addExpense($scope.expense, $scope.stakeholders, function () {
        console.log('expense added');
        $rootScope.$broadcast('displayExpense');
        $state.transitionTo('currentTrip.expense');
        $modalInstance.dismiss('Expense has been added');
      });
    };

  });
  
})();