'use strict';

describe('Component: timer', function() {
  // load the component's module
  beforeEach(module('testcaserApp.timer'));

  var timerComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    timerComponent = $componentController('timer', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
