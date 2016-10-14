'use strict';


export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.test-suites', {
      url: '/projects/{projectId}/test-suites',
      template: '<test-suites></test-suites>'
    });
}
