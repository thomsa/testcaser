'use strict';
const angular = require('angular');
import projectService from './repositories/repository.project.js';
import testResultService from './repositories/repository.testResult.js';


function datacontext(projectResource, testResultResource) {
  return {
    projectResource,
    testResultResource
  };
}

export default angular.module('testcaserApp.data', [
  projectService,
  testResultService
])
.factory('datacontext', datacontext)
.name;
