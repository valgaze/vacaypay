(function() {
  'use strict';

  .factory('Trip', function ($http) {
    var services = {
      createTrip: createTrip,
      hasTrip: hasTrip
    };

    return services;

    function createTrip(trip, callback) {
      console.log(trip);
      $http.post('/trips', {
        name: trip.name,
        code: trip.code
      })
      .then(function() {
        callback();
      });
    };

    function hasTrip(callback) {
      $http.get('/trips')
      .then( function (res) {
        callback(res.data);
      })
    }
  });


})();
