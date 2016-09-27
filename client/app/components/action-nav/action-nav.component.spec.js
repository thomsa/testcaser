'use strict';

describe('Component: actionNav', function() {
  // load the component's module
  beforeEach(module('testcaserApp.action-nav'));

  var actionNavComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    actionNavComponent = $componentController('actionNav', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});