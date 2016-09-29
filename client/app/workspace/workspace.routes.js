'use strict';

export default function($stateProvider) {
  'ngInject'
  $stateProvider
    .state('app.workspace', {
      url: '/workspace',
      template: '<workspace></workspace>',
      data: {
        permissions: {
          only: 'isAuthorized',
          redirectTo: 'login'
        }
      },
      resolve: {
        title: function($rootScope) {
          $rootScope.title = "Workspaces";
        }
      }
    });
}