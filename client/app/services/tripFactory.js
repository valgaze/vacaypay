(function() {
  'use strict';
  angular.module('app')
  .factory('Trip', function ($http, $cacheFactory, Auth) {

    var currentUser = Auth.currentUser;

    var services = {
      createTrip: createTrip,
      cacheTrip: cacheTrip,
      hasTrip: hasTrip
    };

    return services;

    function createTrip(trip, callback) {
      console.log(trip);
      $http.post('/trips', {
        user: currentUser,
        name: trip.name,
        code: trip.code
      })
      .then(function (res) {
        cacheTrip(res.data);
        callback();
      });
    }

    function cacheTrip (trip) {
      var cache = $cacheFactory('tripData');
      cache.put('_id', trip._id);
      cache.put('creator', trip.creator);
      cache.put('participants', trip.participants);
      cache.put('name', trip.name);
      cache.put('code', trip.code);
      cache.put('expenses', trip.expenses);
      return cache;
    }

    function hasTrip(callback) {
      $http.get('/trips', {
        params: { user: currentUser }
      })
      .then( function (res) {
        cacheTrip(res.data);
        callback(res.data);
      });
    }

  });


})();
