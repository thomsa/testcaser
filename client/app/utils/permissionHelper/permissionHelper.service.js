'use strict';
const angular = require('angular');

/*@ngInject*/
export function permissionHelperService(Auth, PermissionStore, RoleStore, $urlRouter, $q, $rootScope, appConfig) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  this.setUpPermissionForUser = function() {
    PermissionStore.clearStore();
    return $q(function(resolve, reject) {
      Auth.isLoggedIn(function(loggedIn) {

        if (loggedIn) {
          PermissionStore.defineManyPermissions(appConfig.userRoles, function(permissionName) {
            return _.contains(data.data.Roles, permissionName);
          });


          PermissionStore.definePermission('admin', function() { return Auth.hasRoleSync('admin') })
          PermissionStore.definePermission('user', function() { return Auth.hasRoleSync('user') })
          PermissionStore.definePermission('isAuthorized', function() { return true });

          // kick-off router and start the application rendering
          $urlRouter.sync();
          // Also enable router to listen to url changes
          $urlRouter.listen();
          console.log(PermissionStore.getStore());
          resolve(true);
        } else {
          // kick-off router and start the application rendering
          $urlRouter.sync();
          // Also enable router to listen to url changes
          $urlRouter.listen();

          PermissionStore.definePermission('isAuthorized', function() { return false });
          reject(false);
        }


      });
      // .then(function(data) {
      //   $sessionStorage.user = data.data;
      //   $rootScope.user = data.data.User;
      //   $rootScope.userRoles = data.data.Roles;
      //   $rootScope.hasPermission = function(permission) {
      //     return $rootScope.userRoles.indexOf(permission) !== -1;
      //   }
      //   this.PermissionStore.defineManyPermissions(permissions, function(permissionName) {
      //     return _.contains(data.data.Roles, permissionName);
      //   });
      //   this.RoleStore.defineRole('GUEST', function() { return data.data.Roles.length === 0; });
      //   this.RoleStore.defineRole('ANONYMOUS', function() { return false; });

      //   this.PermissionStore.definePermission('isAuthorized', function() { return true });

      // }, function(error) {
      //   this.RoleStore.defineRole('GUEST', function() { return false; });
      //   this.RoleStore.defineRole('ANONYMOUS', function() { return true; });
      //   this.PermissionStore.definePermission('isAuthorized', function() { return false; });
      //   $urlRouter.sync();
      //   // Also enable router to listen to url changes
      //   $urlRouter.listen();

      //   reject(error);
      //   return;
      // }).then(function() {
      //   // Once permissions are set-up 
      //   // kick-off router and start the application rendering
      //   $urlRouter.sync();
      //   // Also enable router to listen to url changes
      //   $urlRouter.listen();

      //   resolve(true);
      // });
    });
  }
}

export default angular.module('testcaserApp.permissionHelper', [])
  .service('permissionHelper', permissionHelperService)
  .name;