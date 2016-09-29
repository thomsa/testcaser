'use strict';
const angular = require('angular');

export default angular.module('testcaserApp.openWindow', [])
  .directive('openWindow', function() {
    return {
      restrict: 'EA',
      scope: {
        openWindow: '@',
        windowWidth: '@',
        windowHeight: '@'
      },
      link: function(scope, element, attrs) {
        var clickingCallback = function() {
          var config = 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no';
          if (!scope.windowWidth)
            config += ', width=600';
          else
            config += ', width=' + scope.windowWidth;

          if (!scope.windowHeight)
            config += ', height=600';
          else
            config += ', height=' + scope.windowHeight;

          window.open('http://localhost:3000/' + scope.openWindow, '', config)

        };
        element.bind('click', clickingCallback);
      }
    };
  })
  .name;