(function() {
  'use strict';

  angular.module('app')
  .controller('CurrentTripController', function ($scope, $location, $state, Trip) {
    $scope.currentTrip = {};

    $scope.hasTrip = function () {
      Trip.hasTrip( function (data) {
        $scope.data = data;
        if (!$scope.data.name) {
          $state.transitionTo('fallback');
        }
      });
    };

    $scope.hasTrip();

    $scope.calculateExpense = function () {
      Trip.hasTrip( function (data) {
        var reference = {};
        var result = {};
        var matrix = [];
        $scope.tripData = data;
        $scope.participants = data.participants;
        $scope.tripExpense = data.expenses;
        console.log($scope.tripData);

        for (var i = 0; i < $scope.participants.length; i++) {
          reference[$scope.participants[i]['id']] = 0;
          result[$scope.participants[i]['id']] = {};
        }

        for (var k = 0; k < $scope.tripExpense.length; k++) {
          var payer = $scope.tripExpense[k].payer;
          var stakeholders = $scope.tripExpense[k].stakeholders;
          var amount = $scope.tripExpense[k].amount;
          reference[payer.id] += amount;
          for (var l = 0; l < stakeholders.length; l++) {
            reference[stakeholders[l].id] -= amount/stakeholders.length;
          }
        }

        for (var keys in reference) {
          matrix.push([keys, reference[keys]]);
        }

        matrix.sort( function (a, b) {
          return a[1] - b[1];
        });

        while(matrix[0][1] < 0){
          matrix[matrix.length - 1][1] += matrix[0][1];

          matrix.sort( function (a, b) {
            return a[1] - b[1];
          });
        }



      })
    };


  });
  
})();