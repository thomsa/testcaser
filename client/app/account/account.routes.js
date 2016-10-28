'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('login', {
    url: '/account/login',
    template: require('./login/login.html'),
    controller: 'LoginController',
    controllerAs: 'vm',
    resolve: {
      title($rootScope) {
        $rootScope.title = 'Log in';
      }
    }
  })
    .state('logout', {
      url: '/account/logout?referrer',
      referrer: 'main',
      template: '',
      controller($state, Auth) {
        'ngInject';

        var referrer = $state.params.referrer || $state.current.referrer || 'main';
        Auth.logout();
        $state.go(referrer);
      },
    })
    .state('signup', {
      url: '/account/signup',
      template: require('./signup/signup.html'),
      controller: 'SignupController',
      controllerAs: 'vm',
      resolve: {
        title($rootScope) {
          $rootScope.title = 'Sign up';
        }
      }
    })
    .state('activate', {
      url: '/account/activate?email&token',
      template: require('./activate/activate.html'),
      controller: 'ActivateController',
      controllerAs: 'vm'
    })
    .state('app.settings', {
      url: '/settings',
      template: require('./settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true
    });
}
