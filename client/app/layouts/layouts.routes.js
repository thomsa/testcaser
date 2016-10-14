'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('landing', {
    url: '/',
    template: '<layout-landing></layout-landing>',
    data: {
      permissions: {
        except: 'isAuthorized',
        redirectTo: 'app.workspace'
      }
    },
    resolve: {
      title($rootScope) {
        $rootScope.title = null;
      }
    }
  })
    .state('app', {
      abstract: true,
      template: '<layout-app></layout-app>',


    });
}
