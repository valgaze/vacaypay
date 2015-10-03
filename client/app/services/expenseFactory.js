(function() {
  'use strict';

  angular.module('app')
 .factory('Expenses', function ($http, $window, Auth) {
    var services = {
      allExpenses: allExpenses,
      addExpense: addExpense
    };

    return services;

    function allExpenses (callback) {
      $http.get('/trips')
      .then(function (res) {
        callback(res.data);
      });
    }

    function addExpense (expense, stakeholders, callback) {
      $http.post('/trips/expense', {
        id: $window.localStorage.getItem('userId'),
        amount: expense.amount,
        name: expense.name,
        stakeholders: stakeholders
      }).then(function (res) {
        callback(res.data);
      });
    }

  });
})();