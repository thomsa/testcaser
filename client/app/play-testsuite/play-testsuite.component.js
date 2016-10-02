'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './play-testsuite.routes';

export class PlayTestsuiteComponent {

    testResultModel = {};
    /*@ngInject*/
    constructor(projectResource, socket, $state, $stateParams, testResultResource) {
        this.$stateParams = $stateParams;
        this.projectResource = projectResource;
        this.socket = socket;
        this.testResultResource = testResultResource;
    }

    $onInit() {
        if (this.$stateParams.projectId && this.$stateParams.testSuiteId) {
            this.projectResource.get({ id: this.$stateParams.projectId }, (project) => {

                this.testSuite = _.find(project.test_suites, { 'id': Number(this.$stateParams.testSuiteId) });

                this.testResultModel = new this.testResultResource({
                    projectId: project._id,
                    testSuiteId: Number(this.$stateParams.testSuiteId),
                    results: []
                });

            });

        }
    }

    testOk(testStep) {
        var existingResult = _.find(this.testResultModel.results, { testCaseId: testStep.testCaseId, testStepId: testStep.id });
        if (existingResult) {
            existingResult.isTestOk = true;
        } else {
            this.testResultModel.results.push({ testCaseId: testStep.testCaseId, testStepId: testStep.id, isTestOk: true });
        }
        testStep.result = true;
    }

    testFailed(testStep) {
        var existingResult = _.find(this.testResultModel.results, { testCaseId: testStep.testCaseId, testStepId: testStep.id });
        if (existingResult) {
            existingResult.isTestOk = false;
        } else {
            this.testResultModel.results.push({ testCaseId: testStep.testCaseId, testStepId: testStep.id, isTestOk: false });
        }

        testStep.result = false;
    }
    saveResults() {
        if (!this.testResultModel._id) {
            this.testResultModel.$save().then(data => {
                window.close();
            })
        } else {
            this.testResultModel.$update().then(data => {
                window.close();
            })
        }
    }
}

export default angular.module('testcaserApp.playTestsuite', [uiRouter, 'testcaserApp.project.service', 'testcaserApp.testResult.service'])
    .config(routes)
    .component('playTestsuite', {
        template: require('./play-testsuite.html'),
        controller: PlayTestsuiteComponent,
        controllerAs: 'playTestsuiteCtrl'
    })
    .name;