(function() {
  'use strict';

  angular.module('app')
 .factory('Expenses', function ($http, Auth) {
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
        user: Auth.currentUser(),
        amount: expense.cost,
        name: expense.name,
        stakeholders: stakeholders
      }).then(function (res) {
        callback();
      });
    }

  });
})();