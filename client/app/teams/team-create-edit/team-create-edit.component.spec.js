'use strict';

describe('Component: teamCreateEdit', function() {
  // load the component's module
  beforeEach(module('testcaserApp.team-create-edit'));

  var teamCreateEditComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    teamCreateEditComponent = $componentController('teamCreateEdit', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
