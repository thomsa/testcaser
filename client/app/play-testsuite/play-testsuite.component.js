'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const _ = require('lodash');

import routes from './play-testsuite.routes';

export class PlayTestsuiteComponent {
  isPlaying = false;
  testResultModel = {};
  /*@ngInject*/
  constructor(datacontext, common) {
    this.projectResource = datacontext.projectResource;
    this.testResultResource = datacontext.testResultResource;
    this.$stateParams = common.$stateParams;
    this.socket = common.socket;
  }

  $onInit() {
    if(this.$stateParams.projectId && this.$stateParams.testSuiteId) {
      this.projectResource.get({ id: this.$stateParams.projectId }, project => {
        this.testSuite = _.find(this.getAllTestSuites(project), { id: Number(this.$stateParams.testSuiteId) });

        this.testResultModel = new this.testResultResource({
          projectId: project._id,
          testSuiteId: Number(this.$stateParams.testSuiteId),
          results: []
        });
      });
    }
  }

  getAllTestSuites(project) {
    var result = [];
    if(project) {
      this.getNestedSuite(project.testSuites, result);
    }
    return result;
  }

  getNestedSuite(suites, result) {
    suites.forEach(element => {
      result.push(element);
      this.getNestedSuite(element.nodes, result);
    }, this);
  }

  testOk(testStep) {
    var existingResult = _.find(this.testResultModel.results, { testCaseId: testStep.testCaseId, testStepId: testStep.id });
    if(existingResult) {
      existingResult.isTestOk = true;
    } else {
      this.testResultModel.results.push({ testCaseId: testStep.testCaseId, testStepId: testStep.id, isTestOk: true });
    }
    testStep.result = true;
  }

  testFailed(testStep) {
    var existingResult = _.find(this.testResultModel.results, { testCaseId: testStep.testCaseId, testStepId: testStep.id });
    if(existingResult) {
      existingResult.isTestOk = false;
    } else {
      this.testResultModel.results.push({ testCaseId: testStep.testCaseId, testStepId: testStep.id, isTestOk: false });
    }

    testStep.result = false;
  }

  pause() {
    this.isPlaying = false;
  }


  resume() {
    this.isPlaying = true;
  }

  saveResults() {
    var confirmed;
    if(this.testResultModel.results && this.testResultModel.results.length === 0) {
      confirmed = confirm('You have not finished any tests yet. Are you sure to stop execution? (Result won\'t be saved)');
    } else {
      confirmed = confirm('Are you sure to stop execution? Results will be saved in the current state!');
    }
    if(confirmed) {
      if(!this.testResultModel._id) {
        this.testResultModel.$save().then(data => {
          window.close();
        });
      } else {
        this.testResultModel.$update().then(data => {
          window.close();
        });
      }
    }
  }
}

export default angular.module('testcaserApp.playTestsuite', [])
  .config(routes)
  .component('playTestsuite', {
    template: require('./play-testsuite.html'),
    controller: PlayTestsuiteComponent,
    controllerAs: 'vm',
    bindings: {
      appCtrl: '<'
    }
  })
  .name;
