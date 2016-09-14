'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './test-suites.routes';

export class TestSuitesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('testcaserApp.test-suites', [uiRouter])
  .config(routes)
  .component('testSuites', {
    template: require('./test-suites.html'),
    controller: TestSuitesComponent,
    controllerAs: 'testSuitesCtrl'
  })
  .name;
