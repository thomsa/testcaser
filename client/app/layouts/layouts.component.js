'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './layouts.routes';

export class AppController {

}

export default angular.module('testcaserApp.layouts', [uiRouter])
  .config(routing)
  .component('layoutApp', {
    abstract: true,
    template: require('./app.template.html'),
    controller: AppController
  })
  .component('layoutLanding', {
    abstract: true,
    template: require('./landing.template.html'),
  })
  .name;
