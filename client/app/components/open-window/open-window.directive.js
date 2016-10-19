'use strict';
const angular = require('angular');

export default angular.module('testcaserApp.openWindow', [])
  .directive('tcOpenWindow', function() {
    return {
      restrict: 'EA',
      scope: {
        tcOpenWindow: '@',
        windowWidth: '@',
        windowHeight: '@'
      },
      link(scope, element, attrs) {
        var clickingCallback = function() {
          var config = 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no';
          if(!scope.windowWidth) {
            config += ', width=600';
          } else {
            config += ', width=' + scope.windowWidth;
          }

          if(!scope.windowHeight) {
            config += ', height=600';
          } else {
            config += ', height=' + scope.windowHeight;
          }

          var getUrl = window.location;
          var baseUrl = getUrl.protocol + '//' + getUrl.host;

          window.open(baseUrl + scope.tcOpenWindow, '', config);
        };
        element.bind('click', clickingCallback);
      }
    };
  })
  .name;
