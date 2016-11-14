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
    },
    data: {
      permissions: {
        except: 'isAuthorized',
        redirectTo: 'app.workspace'
      }
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
    },
    data: {
      permissions: {
        except: 'isAuthorized',
        redirectTo: 'app.workspace'
      }
    },

  })
    .state('activate', {
      url: '/account/activate?email&token',
      template: require('./activate/activate.html'),
      controller: 'ActivateController',
      controllerAs: 'vm',
      data: {
        permissions: {
          except: 'isAuthorized',
          redirectTo: 'app.workspace'
        }
      },
    })
    .state('app.settings', {
      url: '/my-account',
      template: require('./settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true,
      resolve: {
        title($rootScope) {
          $rootScope.title = 'My Account';
        }
      }
    });
}
