'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './workspace.routes';

export class WorkspaceComponent {
  /*@ngInject*/
  constructor(projectResource, socket, $state, testResultResource) {
    this.projectResource = projectResource;
    this.socket = socket;
    this.testResultResource = testResultResource;
  }

  $onInit() {
    this.testAnalysis = [];
    this.projectResource.query((projects) => {
      this.projects = projects;
      this.socket.syncUpdates('project', this.projects);


      this.projects.forEach(project => {
        this.projectResource.testanalysis(project._id).then(
          data => {
            this.testAnalysis = data.data;
          },
          error => {

          });
      }, this);
    });
  }

  getSuccessPercent(testSuite) {
    var a = this.testAnalysis.find(elem => {
      return elem.testSuiteId === testSuite.id;
    });

    if(a) {
      var sum = a.successRatio + a.failureRatio;
      return(a.successRatio / sum) * 100 + '%';
    }
    return 0;
  }

  getFailurePercent(testSuite) {
    var a = this.testAnalysis.find(elem => {
      return elem.testSuiteId === testSuite.id;
    });

    if(a) {
      var sum = a.successRatio + a.failureRatio;
      return(a.failureRatio / sum) * 100 + '%';
    }
    return 0;
  }
}

export default angular.module('testcaserApp.workspace', [uiRouter, 'testcaserApp.project.service'])
  .config(routes)
  .component('workspace', {
    template: require('./workspace.html'),
    controller: WorkspaceComponent,
    controllerAs: 'workspaceCtrl'
  })
  .name;
