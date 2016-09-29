'use strict';

describe('Service: permissionHelper', function() {
  // load the service's module
  beforeEach(module('testcaserApp.permissionHelper'));

  // instantiate service
  var permissionHelper;
  beforeEach(inject(function(_permissionHelper_) {
    permissionHelper = _permissionHelper_;
  }));

  it('should do something', function() {
    expect(!!permissionHelper).toBe(true);
  });
});
