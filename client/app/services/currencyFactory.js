(function () {
  'use strict';

  angular.module('app')
  .config(['$httpProvider', function ($httpProvider) {
    console.log($httpProvider.defaults.headers)
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .factory('Currency', ['$http', function ($http) {
    

    var services = {
      getRate: getRate
    };

    return services;

    function getRate(from, successCb, errorCb) {
      if (!from){
        from = 'usd';
      }
      var urlEndpoint = 'http://aqueous-temple-6169.herokuapp.com/api/v1/rate/' + from + '/usd';
        $http({
            url: urlEndpoint,
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function(res) {
            var rateData = res.data;
            successCb(rateData);
        }, function(res) {
            console.log('Error retrieving exchange rates');
            errorCb(res);
        });
    }
  }]);
})();
