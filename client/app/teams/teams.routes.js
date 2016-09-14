'use strict';


export default function ($stateProvider) {
  'ngInject'
  $stateProvider
    .state('app.teams', {
      url: '/teams',
      template: '<teams></teams>'
    })
    .state('app.teams-create', {
      url: '/teams/create',
      template: '<team-create-edit></team-create-edit>',
      data: {
        permissions: {
          only: 'isAuthorized',
          redirectTo: 'login'
        }
      }
    })
    .state('app.teams-edit', {
      url: '/teams/edit/:projectId',
      template: '<team-create-edit></team-create-edit>',
      data: {
        permissions: {
          only: 'isAuthorized',
          redirectTo: 'login'
        }
      }
    });
}
