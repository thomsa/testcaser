'use strict';

describe('Component: PlayTestsuiteComponent', function() {
  // load the controller's module
  beforeEach(module('testcaserApp.playTestsuite'));

  var PlayTestsuiteComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PlayTestsuiteComponent = $componentController('play-testsuite', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
