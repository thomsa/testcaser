'use strict';
const angular = require('angular');

export class TimerComponent {
  seconds = 0;
  ticker;

  /*@ngInject*/
  constructor($interval) {
    this.$interval = $interval;
  }


  $onInit() {
    this.time = this.seconds.toString().toHHMMSS();
  }

  pause() {
    if(angular.isDefined(this.ticker)) {
      this.$interval.cancel(this.ticker);
      this.ticker = undefined;
      this.onPause();
    }
  }
  play() {
    if(!this.ticker) {
      this.ticker = this.$interval(() => {
        this.seconds += 1;
        this.time = this.seconds.toString().toHHMMSS();
      }, 1000);
    }
    this.onPlay();
  }
  stop() {
    this.onStop();
  }

}

export default angular.module('testcaserApp.timer', [])
  .component('timer', {
    template: require('./timer.html'),
    bindings: {
      onStop: '&',
      onPlay: '&',
      onPause: '&'
    },
    controller: TimerComponent
  })
  .name;
