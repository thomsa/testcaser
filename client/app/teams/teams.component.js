'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './teams.routes';
import teamsService from './team.service';
import teamCreateEdit from './team-create-edit/team-create-edit.component';

export class TeamsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('testcaserApp.teams', [uiRouter, 'testcaserApp.team-create-edit', 'testcaserApp.team.service'])
  .config(routes)
  .component('teams', {
    template: require('./teams.html'),
    controller: TeamsComponent,
    controllerAs: 'teamsCtrl'
  })
  .name;
