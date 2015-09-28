describe('ShortenController', function () {
  var $scope, $rootScope, $location, createController, $httpBackend, Trip;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Trip = $injector.get('Trip');
    $location = $injector.get('$location');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('CreateTripController', {
        $scope: $scope,
        Trip: Trip,
        $location: $location
      });
    };

    createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a link property on the $scope', function () {
    expect($scope.trip).to.be.an('object');
  });

  it('should have a addLink method on the $scope', function () {
    expect($scope.createTrip).to.be.a('function');
  });

  it('should be able to create new links with addLink()', function () {
    $httpBackend.expectPOST("/trips").respond(201, '');
    $scope.createTrip();
    $httpBackend.flush();
  });
});
