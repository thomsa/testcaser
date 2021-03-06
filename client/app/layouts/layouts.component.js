'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './layouts.routes';


export default angular.module('testcaserApp.layouts', [])
  .config(routing)
  .component('layoutApp', {
    abstract: true,
    template: require('./app.template.html'),
    controller: 'AppController',
    controllerAs: 'appCtrl'
  })
  .component('layoutLanding', {
    abstract: true,
    template: require('./landing.template.html'),
    controller: 'AppController',
    controllerAs: 'appCtrl'
  })
  .name;
