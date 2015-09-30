(function() {
  'use strict';
  angular.module('app')
  .factory('Trip', function ($http, $cacheFactory, Auth) {

    var services = {
      createTrip: createTrip,
      getTrip: getTrip,
      hasTrip: hasTrip
    };

    return services;

    function createTrip(trip, callback) {
      console.log(trip);
      $http.post('/trips', {
        user: Auth.currentUser(),
        name: trip.name,
        code: trip.code
      })
      .then(function () {
        getTrip();
        callback();
      });
    }

    function getTrip(callback) {
      $http.get('/trips', {
        params: {user: Auth.currentUser()}
      })
      .then(function (res) {
        var cache = $cacheFactory('tripData');
        cache.put('_id', res.data[0]._id);
        cache.put('creator', res.data[0].creator);
        cache.put('participants', res.data[0].participants);
        cache.put('name', res.data[0].name);
        cache.put('code', res.data[0].code);
        cache.put('expenses', res.data[0].expenses);
        callback(cache);
      });
    }

    function hasTrip(callback) {
      $http.get('/trips')
      .then( function (res) {
        callback(res.data);
      });
    }

  });


})();
