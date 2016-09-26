'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.play-testsuite', {
      url: '/play-testsuite/:projectId/:testSuiteId',
      template: '<play-testsuite></play-testsuite>'
    });
}
