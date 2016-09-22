'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import permission from 'angular-permission';


import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import angularUiTree from 'angular-ui-tree';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.scss';

//import ngSticky from 'ngSticky'

//layouts
import layouts from './layouts/layouts.component';
// app modules 
import testSuites from './test-suites/test-suites.component';
import projects from './projects/projects.component';
import teams from './teams/teams.component';
import workSpace from './workspace/workspace.component';

import actionNav from './components/action-nav/action-nav.component';


angular.module('testcaserApp', [
  // ngAnimate, 
  ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter, uiBootstrap, 'permission', 'permission.ui',
   angularUiTree,
  // ngMessages,

  // ngValidationMatch,
  _Auth, account, admin, navbar, footer, main, constants, socket, util,

  //custom
  'testcaserApp.layouts',
  projects, testSuites, teams, workSpace, actionNav

])
  .config(routeConfig)
  .run(function (Auth, PermPermissionStore) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    console.log(Auth);
    PermPermissionStore
      .definePermission('isAuthorized', function () {
        return Auth.isLoggedIn();
      });


  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['testcaserApp'], {
      strictDi: true
    });
  });
