(function() {
  'use strict';

  angular.module('app')
  .controller('CreateExpenseController', ['$scope', '$rootScope', '$window', '$modalInstance', '$state', '$cacheFactory', '$http', 'Expenses', 'Auth', 'Currency',
  function ($scope, $rootScope, $window, $modalInstance, $state, $cacheFactory, $http, Expenses, Auth, Currency) {
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
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.expense.location)
        .then(function(result){

          $scope.expense.location = result.data.results[0].geometry.location;

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
          
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.expense.date = new Date();

    /** Currnency Convert Helper **/

    $scope.currencyModel = [];
    $scope.currencyData = [{id: 1, label: 'Euro'}, {id: 2, label: 'Thai Baht'}, {id: 3, label: 'Vietnamese Dong'}];
    $scope.currDropdownSettings = {
      showCheckAll: false,
      showUncheckAll: false,
      selectionLimit: 1,
      closeOnSelect: true,
      smartButtonMaxItems: 1
    };

    $scope.convert = function () {

      $scope.expense.amount;
    };

    $scope.testFunc = function(){
      console.log('converting!');
      Currency.getRate('rates', function(rate){
        console.log("From createExpense.js:", rate);
      }, function(err){
        console.log(err);
      });
    };


    // $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.expense.address)
    //     .then(function(result){console.log(result.data.results[0].geometry.location)})
            // .then(function(result) {
            //     $scope.geodata = result.data;
        //})
        // .then(console.log($scope.geodata.geometry.location.lat))
  }]);
})();