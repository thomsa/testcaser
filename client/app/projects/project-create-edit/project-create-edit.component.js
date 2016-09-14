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
        if (this.$stateParams.projectId) {
            this.projectResource.get({ id: this.$stateParams.projectId }, (data) => {
                this.project = data;
                this.originalProject = angular.copy(this.project);
            })
        } else {
            this.project = new this.projectResource({ test_suites: [], name: "", description: "" });
            this.originalProject = angular.copy(this.project);
        }
    }

    isModified() {
        return angular.toJson(this.originalProject) !== angular.toJson(this.project);
    };

    saveProject() {
        if (!this.project._id) {
            this.project.$save().then(data => {
                this.$state.go('app.projects');
            })
        } else {
            this.project.$update().then(data => {
                this.$state.go('app.projects');
            })
        }
    }

    remove(scope) {
        scope.remove();
    };

    toggle(scope) {
        scope.toggle();
    };

    moveLastToTheBeginning() {
        var a = this.project.test_suites.pop();
        this.project.test_suites.splice(0, 0, a);
    };

    newSubItem(scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length + 1,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: [],
            test_suites: []
        });
    };

    newItem() {
        this.project.test_suites.push({
            id: this.project.test_suites.length + 1,
            title: "Test suite " + (this.project.test_suites.length + 1),
            nodes: [],
            test_suites: []
        })
    }


    addNewTestCase() {

        this.getAllTestSuites().forEach(function(element) {
            if (element.id === this.selectedTestSuite.id) {
                if (!element.test_cases)
                    element.test_cases = [];

                element.test_cases.push(({
                    id: element.test_cases.length + 1,
                    title: "Test case " + (element.test_cases.length + 1),
                    nodes: [],
                    test_steps: []
                }));

                this.selectedTestSuite = element;
            }
        }, this);


    }
    getAllTestSuites() {
        var result = [];
        if (this.project)
            this.getNestedSuite(this.project.test_suites, result);
        return result;
    }

    getNestedSuite(suites, result) {
        suites.forEach(function(element) {
            result.push(element);
            this.getNestedSuite(element.nodes, result);
        }, this);
    }

    setFirstEmptyTestStep(node) {
        if (!node.test_steps)
            node.test_steps = [];

        node.test_steps.push({ action: "", expectedResult: "" });

    }

    selectTestSuite(node) {
        this.project.test_suites.forEach(function(element) {
            if (element.id !== node.id) {
                element.selected = false;
            }
        }, this);
        if (node.test_steps.length === 0) {
            node.test_steps.push({ action: "", expectedResult: "" });
        }

        this.selectedTestSuite = node;


    }

    addNewStep(testSuite) {
        var lastStep = testSuite.test_steps[testSuite.test_steps.length - 1];

        if (lastStep.action.length !== 0 && lastStep.expectedResult.length !== 0)
            testSuite.test_steps.push({ action: "", expectedResult: "" });
    }

}

export default angular.module('testcaserApp.project-create-edit', [])
    .component('projectCreateEdit', {
        template: require('./project-create-edit.html'),
        controller: ProjectCreateEditComponent
    })
    .name;