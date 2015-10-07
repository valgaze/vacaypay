(function() {
  'use strict';

  angular.module('app')
  .controller('CreateExpenseController', ['$scope', '$rootScope', '$window', '$modalInstance', '$state', '$cacheFactory', 'Expenses', 'Auth',
  function ($scope, $rootScope, $window, $modalInstance, $state, $cacheFactory, Expenses, Auth) {
    var cache = $cacheFactory.get('tripData');

    $scope.expense = {};
    var participants = cache.get('participants');
    var creatorId = $window.localStorage.getItem('userId');
    var creatorUsername = $window.localStorage.getItem('username');

    // Participants is mapped to format it in a way that the dropdown menu can understand.
    $scope.participants = participants.map(function(participant) {
      return { id: participant.id, label: participant.username };
    });

    // $scope.stakeholders is the model that the dropdown menu creates.
    $scope.stakeholders = [{id: creatorId, label: creatorUsername}];

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
        $scope.stakeholders = [{id: creatorId, label: creatorUsername}];
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
    $scope.expense.date = new Date();
  }]);
})();