(function() {
  'use strict';
  angular.module('app')
  .factory('Trip', function ($http) {

    var services = {
      createTrip: createTrip,
      getTrip: getTrip,
      hasTrip: hasTrip
    };

    return services;

    function createTrip(trip, callback) {
      console.log(trip);
      $http.post('/trips', {
        name: trip.name,
        code: trip.code
      })
      .then(function () {
        getTrip();
        callback();
      });
    }

    function getTrip() {
      $http.get('/trips', { cache: true });
    }

    function hasTrip(callback) {
      $http.get('/trips')
      .then( function (res) {
        callback(res.data);
      });
    }

  });


})();
