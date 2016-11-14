'use strict';


export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.projects', {
      url: '/projects',
      template: '<projects app-ctrl="appCtrl"></projects>',
      data: {
        permissions: {
          only: 'isAuthorized',
          redirectTo: 'login'
        }
      },
      resolve: {
        title($rootScope, $sce) {
          $rootScope.title = 'Projects';
        }
      }
    })
    .state('app.projects-create', {
      url: '/projects/create',
      template: '<project-create-edit  app-ctrl="appCtrl"></project-create-edit>',
      data: {
        permissions: {
          only: 'isAuthorized',
          redirectTo: 'login'
        }
      },
      resolve: {
        title($rootScope) {
          $rootScope.title = 'Create new project';
        }
      }
    })
    .state('app.projects-edit', {
      url: '/projects/edit/:projectId',
      template: '<project-create-edit  app-ctrl="appCtrl"></project-create-edit>',
      data: {
        permissions: {
          only: 'isAuthorized',
          redirectTo: 'login'
        }
      },
      resolve: {
        title($rootScope) {
          $rootScope.title = 'Edit project';
        }
      }
    });
}
