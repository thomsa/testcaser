'use strict';

describe('Controller: ActivateCtrl', function() {
  // load the controller's module
  beforeEach(module('testcaserApp.account'));

  var ActivateCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    ActivateCtrl = $controller('ActivateCtrl', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
