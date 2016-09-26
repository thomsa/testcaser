'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './play-testsuite.routes';

export class PlayTestsuiteComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('testcaserApp.playTestsuite', [uiRouter])
  .config(routes)
  .component('playTestsuite', {
    template: require('./play-testsuite.html'),
    controller: PlayTestsuiteComponent,
    controllerAs: 'playTestsuiteCtrl'
  })
  .name;
