'use strict';

export class NavbarComponent {
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(Auth, $state, permissionHelper) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.logout = function () {
      Auth.logout();
      permissionHelper.setUpPermissionForUser().then(
        (loggedIn) => {

          //  toastr.success("Welcome " + $sessionStorage.user.User.Name + "!", 'Login Successful!');
        },
        (loggedOut) => {
          $state.go('landing');
        });
    };
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
