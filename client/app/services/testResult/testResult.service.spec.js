'use strict';

describe('Service: testResult', function() {
  // load the service's module
  beforeEach(module('testcaserApp.testResult.service'));

  // instantiate service
  var testResult;
  beforeEach(inject(function(_testResult_) {
    testResult = _testResult_;
  }));

  it('should do something', function() {
    expect(!!testResult).toBe(true);
  });
});
