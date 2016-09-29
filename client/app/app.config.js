'use strict';

export function routeConfig($urlRouterProvider, $locationProvider) {
  'ngInject';

  $urlRouterProvider.deferIntercept();
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}
