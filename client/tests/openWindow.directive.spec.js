'use strict';

describe('Directive: openWindow', function() {
  // load the directive's module and view
  beforeEach(module('testcaserApp.openWindow'));
  beforeEach(module('app/directives/openWindow/openWindow.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<tc-open-window></tc-open-window>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the openWindow directive');
  }));
});
