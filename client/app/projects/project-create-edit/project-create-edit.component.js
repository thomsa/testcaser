'use strict';
const angular = require('angular');

export class ProjectCreateEditComponent {
  /*@ngInject*/
  constructor(projectResource, $state, $stateParams, $scope) {
    this.projectResource = projectResource;
    this.$state = $state;
    this.$stateParams = $stateParams;

    this.$scope = $scope;
    this.actions = [];
  }

  $onInit() {
    if(this.$stateParams.projectId) {
      this.projectResource.get({ id: this.$stateParams.projectId }, data => {
        this.project = data;
        this.originalProject = angular.copy(this.project);
      });
    } else {
      this.project = new this.projectResource({ testSuites: [], name: '', description: '' });
      this.originalProject = angular.copy(this.project);
    }
    this.fabOpen = true;
  }

  isModified() {
    return angular.toJson(this.originalProject) !== angular.toJson(this.project);
  }

  saveProject() {
    var allSuites = this.getAllTestSuites();

    allSuites.forEach(suite => {
      if(suite.testCases) {
        suite.testCases.forEach(testCase => {
          if(testCase) {
            var lastStep = testCase.testSteps.last();
            if(lastStep && lastStep.action === '' && lastStep.expectedResult === '') {
              testCase.testSteps.pop();
            }
          }
        }, this);
      }
    }, this);

    if(!this.project._id) {
      this.project.$save().then(data => {
        this.$state.go('app.projects');
      });
    } else {
      this.project.$update().then(data => {
        this.$state.go('app.projects');
      });
    }
  }

  remove(scope) {
    scope.remove();
  }

  toggle(scope) {
    scope.toggle();
  }

  moveLastToTheBeginning() {
    var a = this.project.testSuites.pop();
    this.project.testSuites.splice(0, 0, a);
  }

  newSubItem(scope) {
    var nodeData = scope.$modelValue;
    nodeData.nodes.push({
      id: nodeData.id * 10 + nodeData.nodes.length + 1,
      title: nodeData.title + '.' + (nodeData.nodes.length + 1),
      nodes: [],
      testSuites: []
    });
  }

  newItem() {
    this.project.testSuites.push({
      id: this.project.testSuites.length + 1,
      title: 'Test suite ' + (this.project.testSuites.length + 1),
      nodes: [],
      testSuites: []
    });
  }


  addNewTestCase() {
    this.getAllTestSuites().forEach(element => {
      if(element.id === this.selectedTestSuite.id) {
        if(!element.testCases) {
          element.testCases = [];
        }

        element.testCases.push(({
          id: element.testCases.length + 1,
          testSuiteId: element.id,
          title: 'Test case ' + (element.testCases.length + 1),
          testSteps: []
        }));
        this.selectedTestSuite = element;
      }
    }, this);
  }
  getAllTestSuites() {
    var result = [];
    if(this.project) {
      this.getNestedSuite(this.project.testSuites, result);
    }
    return result;
  }

  getNestedSuite(suites, result) {
    suites.forEach(element => {
      result.push(element);
      this.getNestedSuite(element.nodes, result);
    }, this);
  }

  setFirstEmptyTestStep(node) {
    if(!node.testSteps) {
      node.testSteps = [];
    }
    if(node.testSteps.length === 0) {
      node.testSteps.push({ action: '', expectedResult: '' });
    }
  }

  selectTestCase(node) {
    this.getAllTestSuites().forEach(test_suite => {
      if(test_suite.id === node.testSuiteId) {
        test_suite.testCases.forEach(testCase => {
          if(testCase.id === node.id) {
            if(testCase.testSteps.length === 0) {
              testCase.testSteps.push({ id: 1, action: '', expectedResult: '', testCaseId: testCase.id });
            }
            this.selectedTestCase = testCase;
            this.selectedTestCase.showCummulatedExpectedResult = !!this.selectedTestCase.cummulatedExpectedResult;
          }
        }, this);
      }
    }, this);
  }

  addNewStep(testSuite) {
    var lastStep = this.selectedTestCase.testSteps[this.selectedTestCase.testSteps.length - 1];

    if(lastStep.action.length !== 0 && lastStep.expectedResult.length !== 0) {
      this.selectedTestCase.testSteps.push({
        id: this.selectedTestCase.testSteps.length + 1,
        action: '',
        expectedResult: '',
        testCaseId: this.selectedTestCase.id
      });
      setTimeout(() => {
        var inputs = $('#test-step-nodes :input');
        inputs[inputs.length - 2].focus();
      }, 200);
    }
  }

  showCummulatedResult(showCummulatedExpectedResult) {
    if(showCummulatedExpectedResult) {
      this.selectedTestCase.cummulatedExpectedResult = '';
    } else {
      this.selectedTestCase.cummulatedExpectedResult = undefined;
    }
  }

}

export default angular.module('testcaserApp.project-create-edit', [])
  .component('projectCreateEdit', {
    template: require('./project-create-edit.html'),
    controller: ProjectCreateEditComponent,
    controllerAs: 'vm',
    bindings: {
      appCtrl: '<'
    }
  })
  .name;
