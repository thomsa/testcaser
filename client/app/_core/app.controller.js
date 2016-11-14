export default class AppController {

  /*@ngInject*/
  constructor($scope, $mdSidenav, Auth, permissionHelper, $state, $window) {

    this.$mdSidenav = $mdSidenav;
    this.Auth = Auth;
    this.permissionHelper = permissionHelper;
    this.$state = $state;
    this.$window = $window;

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    this.fabDirection = function () {
      if($window.innerWidth < 960) {
        return 'up';
      }
      return 'down';
    };
  }

  onClickMenu(mobile) {
    if(!mobile) {
      this.$mdSidenav('left').toggle();
      return;
    }
    if(this.$window.innerWidth < 1280) {
      this.$mdSidenav('left').close();
    }
  }

  logOut() {
    this.Auth.logout();
    this.permissionHelper.setUpPermissionForUser().then(
      loggedIn => {},
      loggedOut => {
        this.$state.go('landing');
      });
  }
}
