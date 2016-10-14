'use strict';

// npm modules
import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import permission from 'angular-permission';
import moment from 'momentjs';
import humanizeDuration from 'humanize-duration';
import 'angular-socket-io';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import angularUiTree from 'angular-ui-tree';


//custom modules
import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.scss';

import config from './config.js';

//extensions
import extensions from './utils/extensions.js';

//layouts
import layouts from './layouts/layouts.component';

// app routes
import testSuites from './test-suites/test-suites.component';
import projects from './projects/projects.component';
import teams from './teams/teams.component';
import workSpace from './workspace/workspace.component';
import playTestsuite from './play-testsuite/play-testsuite.component';

//app components
import actionNav from './components/action-nav/action-nav.component';
import timer from './components/timer/timer.component';

//app directives
import openWindow from './directives/openWindow/openWindow.directive';

//app utils
import permissionHelperModule from './utils/permissionHelper/permissionHelper.service';

//app services
import projectService from './services/project/project.service';
import testResultService from './services/testResult/testResult.service';


angular.module('testcaserApp', [
    // npm modules
  ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter, uiBootstrap, 'permission', 'permission.ui',
  angularUiTree,
  _Auth, account, admin, navbar, footer, constants, socket, util,

  'testcaserApp.config',
    //app modules
  'testcaserApp.layouts',
  projects, testSuites, timer, teams, workSpace, actionNav, playTestsuite,
  openWindow, permissionHelperModule,

])
  .config(routeConfig)
  .run(function(Auth, permissionHelper, version, $rootScope) {
    'ngInject';

    $rootScope.version = version;
    // Redirect to login if route requires auth and you're not logged in
    permissionHelper.setUpPermissionForUser()
      .then(function(data) {
        // callback for successfull user login
      }, function(error) {
        // callback for unsuccessfull user login
      });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['testcaserApp'], {
      strictDi: true
    });
  });
