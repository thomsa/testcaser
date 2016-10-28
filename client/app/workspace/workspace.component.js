'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './workspace.routes';

export class WorkspaceComponent {
  /*@ngInject*/
  constructor(socket, datacontext) {
    this.projectResource = datacontext.projectResource;
    this.socket = socket;
    this.testResultResource = datacontext.testResultResource;
  }

  $onInit() {
    this.socket.syncUpdates('testResult', null, false,
      (event, item, array) => {
        if(item.projectId === this.selectedProject._id) {
          this.getTestAnalysis();
        }
      });

    this.testAnalysis = [];
    this.projectResource.query(projects => {
      this.projects = projects;
      this.socket.syncUpdates('project', this.projects, true,
        (event, item, array) => {
          if(item._id === this.selectedProject._id) {
            this.selectedProject = item;
            this.getTestAnalysis();
          }
        });
    });

    this.barchart = {};
    this.barchart.labels = [];
    this.barchart.series = ['Times played'];
    this.barchart.data = [];

    this.piechart = {};
    this.piechart.labels = ['Succeeded Steps', 'Failed Steps'];
    this.piechart.data = [];
    this.piechart.colors = ['#5cb85c', '#d9534f'];
  }

  setSelectedTestSuite(testSuite) {
    this.selectedTestsuite = testSuite;
    this.setUpCharts(testSuite);
  }

  setUpCharts(testSuite) {
    var analysis = this.getTestAnalysisForTestSuite(testSuite);
    if(analysis) {
      this.barchart.labels = [];
      this.barchart.data = [];
      analysis.byDate.forEach(byDate => {
        this.barchart.labels.push(byDate.date);
        this.barchart.data.push(byDate.times);
      }, this);

      this.piechart.data = [analysis.successRatio, analysis.failureRatio];
    } else {
      this.barchart.labels = [];
      this.barchart.data = [];
      this.piechart.data = [];
    }
  }

  setSelectedProject(project) {
    this.selectedProject = project;
    this.getTestAnalysis();
  }

  getTestAnalysis() {
    this.projectResource.testanalysis(this.selectedProject._id).then(
      data => {
        this.testAnalysis = data.data;
        if(this.selectedTestsuite) {
          this.setUpCharts(this.selectedTestsuite);
        }
      },
      error => {

      });
  }

  getSuccessPercent() {
    if(this.selectedTestsuite) {
      var a = this.getTestAnalysisForTestSuite(this.selectedTestsuite);

      if(a) {
        var sum = a.successRatio + a.failureRatio;
        return (a.successRatio / sum) * 100 + '%';
      }
      return 0;
    }
  }

  getFailurePercent() {
    if(this.selectedTestsuite) {
      var a = this.getTestAnalysisForTestSuite(this.selectedTestsuite);

      if(a) {
        var sum = a.successRatio + a.failureRatio;
        return (a.failureRatio / sum) * 100 + '%';
      }
      return 0;
    }
  }

  getTestAnalysisForTestSuite = function(testSuite) {
    var analysis = this.testAnalysis.find(elem => {
      return elem.testSuiteId === testSuite.id;
    });

    return analysis;
  }


}

export default angular.module('testcaserApp.workspace', [uiRouter, 'testcaserApp.project.service'])
  .config(routes)
  .component('workspace', {
    template: require('./workspace.html'),
    controller: WorkspaceComponent,
    controllerAs: 'vm'
  })
  .name;
