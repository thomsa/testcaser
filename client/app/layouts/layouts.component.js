'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './layouts.routes';

export class AppController {

  /*@ngInject*/
  constructor($mdSidenav, Auth, permissionHelper, $state) {
    this.$mdSidenav = $mdSidenav;
    this.Auth = Auth;
    this.permissionHelper = permissionHelper;
    this.$state = $state;

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  onClickMenu() {
    this.$mdSidenav('left').toggle();
  }

  logOut() {
    this.Auth.logout();
    this.permissionHelper.setUpPermissionForUser().then(
      loggedIn => {
      },
      loggedOut => {
        this.$state.go('landing');
      });
  }
}



export default angular.module('testcaserApp.layouts', [])
  .config(routing)
  .component('layoutApp', {
    abstract: true,
    template: require('./app.template.html'),
    controller: AppController,
    controllerAs: 'appCtrl'
  })
  .component('layoutLanding', {
    abstract: true,
    template: require('./landing.template.html'),
    controller: AppController,
    controllerAs: 'appCtrl'
  })
  .name;
