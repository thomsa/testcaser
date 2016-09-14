'use strict';

describe('Component: TestSuitesComponent', function() {
  // load the controller's module
  beforeEach(module('testcaserApp.test-suites'));

  var TestSuitesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TestSuitesComponent = $componentController('test-suites', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
