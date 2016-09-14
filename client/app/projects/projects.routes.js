'use strict';


export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.projects', {
      url: '/projects',
      template: '<projects></projects>',
      data: {
        permissions: {
          only: 'isAuthorized',
          redirectTo: 'login'
        }
      },
      resolve: {
        title: function ($rootScope, $sce) {
          $rootScope.title = "Projects";
          $rootScope.navActionsInject = $sce.trustAsHtml('<li><a ng-click="$ctrl.navigate(\'app.projects-create\')">Link</a></li>');
        }
      }
    })
    .state('app.projects-create', {
      url: '/projects/create',
      template: '<project-create-edit></project-create-edit>',
      data: {
        permissions: {
          only: 'isAuthorized',
          redirectTo: 'login'
        }
      },
      resolve: {
        title: function ($rootScope) {
          $rootScope.title = "Create new project";
        }
      }
    })
    .state('app.projects-edit', {
      url: '/projects/edit/:projectId',
      template: '<project-create-edit></project-create-edit>',
      data: {
        permissions: {
          only: 'isAuthorized',
          redirectTo: 'login'
        }
      },
      resolve: {
        title: function ($rootScope) {
          $rootScope.title = "Edit project";
        }
      }
    });
}
