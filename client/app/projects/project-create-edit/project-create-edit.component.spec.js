'use strict';

describe('Component: projectCreateEdit', function() {
  // load the component's module
  beforeEach(module('testcaserApp.project-create-edit'));

  var projectCreateEditComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    projectCreateEditComponent = $componentController('projectCreateEdit', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
