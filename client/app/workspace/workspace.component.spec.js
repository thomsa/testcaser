'use strict';

describe('Component: WorkspaceComponent', function() {
  // load the controller's module
  beforeEach(module('testcaserApp.workspace'));

  var WorkspaceComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    WorkspaceComponent = $componentController('workspace', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
