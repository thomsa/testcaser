'use strict';
const angular = require('angular');

export class teamCreateEditComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('testcaserApp.team-create-edit', [])
  .component('teamCreateEdit', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: teamCreateEditComponent
  })
  .name;
