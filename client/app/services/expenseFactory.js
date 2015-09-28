(function() {
  'use strict';

  angular.module('app')
 .factory('Expenses', function ($http) {
    var services = {
      allExpenses: allExpenses
    };

    return services;

    function allExpenses(callback) {
      $http.get('/trips')
      .then(function (res) {
        callback(res.data);
      });
    };

  });
})();