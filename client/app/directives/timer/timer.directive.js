'use strict';
const angular = require('angular');

export default angular.module('testcaserApp.timer', [])
  .directive('timer', function() {
    return {
      templateUrl: 'app/directives/timer/timer.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {

      },
      controller: function($scope) {
        var seconds = 0;
        setInterval(() => {
          seconds += 1;
          this.time = seconds.toString().toHHMMSS();
        }, 1000)
      },
      controllerAs: 'ctrl'
    };
  })
  .name;


String.prototype.toHHMMSS = function() {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}