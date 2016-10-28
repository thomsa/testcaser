'use strict';

describe('Service: services', function() {
  // load the service's module
  beforeEach(module('testcaserApp.services'));

  // instantiate service
  var services;
  beforeEach(inject(function(_services_) {
    services = _services_;
  }));

  it('should do something', function() {
    expect(!!services).toBe(true);
  });
});
