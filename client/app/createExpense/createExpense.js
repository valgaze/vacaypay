(function() {
  'use strict';

  angular.module('app')
  .controller('CreateExpenseController', ['$scope', '$rootScope', '$window', '$modalInstance', '$state', '$cacheFactory', '$http', 'Expenses', 'Auth', 'Currency', 'worldCurrencies',
  function ($scope, $rootScope, $window, $modalInstance, $state, $cacheFactory, $http, Expenses, Auth, Currency, worldCurrencies) {
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
    $scope.currencyModel = {id: 147};
    $scope.symbol = '$';



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
      var onSuccess = function (exchangeRateobj){
        console.log("Exchange rate", exchangeRateobj.rate);
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.expense.locationString)
          .then(function(result){

            if (!result.data.results[0]){
              //#TODO: Improve this error handling
              alert('Invalid location');
              return;              
            }
            $scope.expense.location = result.data.results[0].geometry.location;

            if(!$scope.stakeholders.length) {
              $scope.stakeholders = [{id: creatorId, label: creatorUsername}];
            }
            // Return the data back to the server in the correct format
            $scope.stakeholders = $scope.stakeholders.map(function(stakeholder) {
              return { id: stakeholder.id, username: stakeholder.label };
            });
            
            //Expense String:
            $scope.expense.expenseString = $scope.expense.amount + " " +$scope.currencyData[$scope.currencyModel.id-1].label;
            //Conversion
            $scope.expense.amount = $scope.expense.amount*exchangeRateobj.rate;



            Expenses.addExpense($scope.expense, $scope.stakeholders, function (tripData) {
              console.log('expense added');
              $modalInstance.close(tripData.expenses);
            });
            
          });
      };

      var onError = function(err){
        //#TODO: Improve this error handling
        alert('There was a catastrophic error:' + err);
        return;  
      };

      var fromCurrency = $scope.currencyData[$scope.currencyModel.id - 1].code || 'usd';
      Currency.getRate(fromCurrency, onSuccess, onError);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.expense.date = new Date();

    /** Currency Convert Helper **/


    $scope.currDropdownSettings = {
      showCheckAll: false,
      showUncheckAll: false,
      selectionLimit: 1,
      closeOnSelect: true,
      smartButtonMaxItems: 1,
      enableSearch: true
    };


    $scope.currencyData = worldCurrencies.retrieveCurrencies();

    $scope.$watch('currencyModel.id',function(newValue,oldValue){
      $scope.symbol = $scope.currencyData[$scope.currencyModel.id - 1].symbol;
      console.log($scope.symbol);
    });
  }]);
})();