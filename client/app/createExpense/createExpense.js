(function() {
  'use strict';

  angular.module('app')
  .controller('CreateExpenseController', function ($scope, $rootScope, $modalInstance, $state, $cacheFactory, Expenses) {
    var cache = $cacheFactory.get('tripData');

    $scope.expense = {};
    var participants = cache.get('participants');
    var creator = cache.get('creator')

    // Partiicpants is mapped to format it in a way that the dropdown menu can understand.
    $scope.participants = participants.map(function(participant) {
      return { id: participant.id, label: participant.username };
    });

    // $scope.stakeholders is the model that the dropdown menu creates.
    $scope.stakeholders = [{id: creator.id, label: creator.username}];

    // Configures the dropdown menu
    // http://dotansimha.github.io/angularjs-dropdown-multiselect/#/
    $scope.dropdownSettings = {
      smartButtonMaxItems: 5,
      scrollableHeight: '200px',
      scrollable: true,
      externalIdProp: '',
    };

    $scope.buttonText = {
      buttonDefaultText: 'Select Contributors'
    };

    $scope.addExpense = function () {
      // If the stakeholders model is empty add the creator to the model
      if(!$scope.stakeholders.length) {
        $scope.stakeholders = [{id: creator.id, label: creator.username}];
      }

      // Return the data back to the server in the correct format
      $scope.stakeholders = $scope.stakeholders.map(function(stakeholder) {
        return { id: stakeholder.id, username: stakeholder.label };
      });
      Expenses.addExpense($scope.expense, $scope.stakeholders, function (tripData) {
        console.log('expense added');
        $modalInstance.close(tripData.expenses);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
  
})();