'use strict';

export class NavbarComponent {

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent,
    controllerAs: 'navbarCtrl',
    bindings: {
      appCtrl: '<'
    }
  })
  .name;
