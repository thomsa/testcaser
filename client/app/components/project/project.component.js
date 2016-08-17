'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './project.routes';

export class ProjectComponent {
  $http;
  socket;
  projects = [];
  newProject = {};

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/projects')
      .then(response => {
        this.projects = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    console.log('ba')
    if (this.newProject) {
      this.$http.post('/api/projects', this.newProject);
      this.newProject = {};
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/projects/' + thing._id);
  }
}

export default angular.module('testcaser.project', [uiRouter])
  .config(routes)
  .component('project', {
    template: require('./project.html'),
    controller: ProjectComponent
  })
  .name;
