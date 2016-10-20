'use strict';


export function permissionHelperService(Auth, PermissionStore, RoleStore, $urlRouter, $q) {
  'ngInject';

  var permHelper = {
    setUpPermissionForUser() {
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
    }
  };

  return permHelper;
}
