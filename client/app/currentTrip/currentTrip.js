(function() {
  'use strict';

  angular.module('app')
  .controller('CurrentTripController', ['$scope', '$location', '$state', 'Trip', 'Auth', '$window',
  function ($scope, $location, $state, Trip, Auth, $window) {
    $scope.currentTrip = {};
    $scope.username = $window.localStorage.getItem('username');


    $scope.logout = function() {
      Auth.signout();
    };

    $scope.hasTrip = function () {
      Trip.hasTrip( function (data) {
        $scope.data = data;

        if (data){          
          $scope.fellowTravelers = data.participants.filter(function(nameObj){
            return nameObj.id !== data.creator.id;
          }).map(function(nameObj){
            return nameObj.username;
          });
        }

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

        // reference is used to keep track of + and - as we iterate through expenses
        // result is the summary for users (who should pay how much)
        for (var i = 0; i < $scope.participants.length; i++) {
          reference[$scope.participants[i]['id']+ ',' + $scope.participants[i]['username']] = 0;
          result[$scope.participants[i]['id']+ ',' + $scope.participants[i]['username']] = {};
        }

        // Loop through all expense
        for (var k = 0; k < $scope.tripExpense.length; k++) {
          var payer = $scope.tripExpense[k].payer;
          var stakeholders = $scope.tripExpense[k].stakeholders;
          var amount = $scope.tripExpense[k].amount;
          // Add + for how much payer should receive
          reference[payer.id + ',' + payer.username] += amount;
          // Split the payment among stakeholders as -
          for (var l = 0; l < stakeholders.length; l++) {
            reference[stakeholders[l].id + ',' + stakeholders[l].username] -= amount/stakeholders.length;
          }
        }

        // Makes list of key-value pair from reference
        for (var keys in reference) {
          matrix.push([keys, reference[keys]]);
        }
        matrix.sort( function (a, b) {
          return a[1] - b[1];
        });

        // While the lowest has debt less than 0 (implying that we are not even yet),
        // continue to make someone pay off the debt.
        // This part can be improved by implementing a helper function that finds minimum and maximum
        // instead of sorting, which is what we are doing right now.
        // I feel lazy
        while(matrix[0][1] < -0.000000001){
          // Most 'broke' person tries to pay out to the richest person as much as possible.
          if(matrix[matrix.length - 1][1] > -1*matrix[0][1]){
            result[matrix[0][0]][matrix[matrix.length-1][0]] = -1*matrix[0][1];
            matrix[matrix.length - 1][1] += matrix[0][1];
            matrix[0][1] = 0;
          } else {
            result[matrix[0][0]][matrix[matrix.length-1][0]] = matrix[matrix.length - 1][1];
            matrix[0][1] += matrix[matrix.length - 1][1];
            matrix[matrix.length - 1][1] = 0;
          }

          // After payment, sort to find min and max
          matrix.sort( function (a, b) {
            return a[1] - b[1];
          });
        }
        // Now result is an object representing what user should pay which user how much
        var resultArr = [];
        for(var keys in result) {
          var payerName = keys.split(',')[1];
          for(var innerKeys in result[keys]) {
            var payeeName = innerKeys.split(',')[1];
            resultArr.push({ username: payerName,
                                payee: {
                                  username: payeeName,
                                  amount: result[keys][innerKeys]
                                }});                     
          }
        }
        $scope.tripData.summary = resultArr;
        Trip.endTrip($scope.tripData, function () {
          $state.transitionTo('fallback');
        });
      });
    };
  }]);
})();