(function() {
  'use strict';

  angular.module('app')
 .factory('PastTrips', ['$http', function ($http) {
    var services = {
      allPastTrips: allPastTrips
    };

    return services;

    function allPastTrips (callback) {
      $http.get('/trips') // We don't have a route yet?
      .then(function (res) {
        callback(res.data);
      });
    }

  }]);
})();