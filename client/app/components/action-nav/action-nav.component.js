'use strict';
const angular = require('angular');

export class ActionNavComponent {
  /*@ngInject*/
  constructor() {
    console.log(this);
  }

  callbackAction(action) {
    if (angular.isFunction(action))
      action.apply();

  }
}


export default angular.module('testcaserApp.action-nav', [])
  .component('actionNav', {
    template: require('./action-nav.html'),
    controller: ActionNavComponent,
    bindings: {
      pageTitle: '<',
      actions: '<'
    }

  })
  .name;
