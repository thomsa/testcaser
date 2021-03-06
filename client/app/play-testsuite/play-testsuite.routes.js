'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('play-testsuite', {
      url: '/play-testsuite/:projectId/:testSuiteId',
      template: '<play-testsuite></play-testsuite>',
      data: {
        permissions: {
          only: 'isAuthorized',
          redirectTo: 'login'
        }
      },
      resolve: {
        title($rootScope) {
          $rootScope.title = 'Run Test';
        }
      }
    });
}
