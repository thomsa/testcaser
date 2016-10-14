'use strict';
const angular = require('angular');

/*@ngInject*/
export function permissionHelperService(Auth, PermissionStore, RoleStore, $urlRouter, $q, $rootScope, appConfig) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  this.setUpPermissionForUser = function() {
    PermissionStore.clearStore();

    return $q(function(resolve, reject) {
      Auth.isLoggedIn(function(loggedIn) {
        if(loggedIn) {
          PermissionStore.definePermission('admin', function() {
            return Auth.hasRoleSync('admin');
          });
          PermissionStore.definePermission('user', function() {
            return Auth.hasRoleSync('user');
          });
          PermissionStore.definePermission('isAuthorized', function() {
            return true;
          });

          // kick-off router and start the application rendering
          $urlRouter.sync();
          // Also enable router to listen to url changes
          $urlRouter.listen();
          resolve(true);
        } else {
          // kick-off router and start the application rendering
          $urlRouter.sync();
          // Also enable router to listen to url changes
          $urlRouter.listen();

          PermissionStore.definePermission('isAuthorized', function() {
            return false;
          });
          reject(false);
        }
      });
    });
  };
}

export default angular.module('testcaserApp.permissionHelper', [])
  .service('permissionHelper', permissionHelperService)
  .name;
