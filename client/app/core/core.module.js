import angular from 'angular';

//gulp bump
import generated from './generated/config.js';

//DI
// angular modules
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';


//reusable custom modules
import common from './common';
import auth from './services/auth/auth.module';
import util from './services/util.service';
import socket from './services/socket.service';
import toasterService from './services/toastr.service';


//3rd party
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import angularUiTree from 'angular-ui-tree';
import ngSticky from 'ngsticky';
import angularChart from 'angular-chart.js';
import permission from 'angular-permission';
import 'angular-socket-io';
import toastr from 'angular-toastr';


// CONFIGS AND constants
import {
  routeConfig
} from './core.config';
import constants from './core.constants';


angular.module('testcaserApp.core', [
    /*
     * Angular modules
     */
  ngCookies,
  ngResource,
  ngSanitize,
    /*
     * Reusable cross app modules
     */
  auth,
  socket,
  constants,
  util,
  common,
  toasterService,
    /*
     * 3rd party modules
     */
  'btford.socket-io',
  uiRouter,
  uiBootstrap,
  'permission',
  'permission.ui',
  'sticky',
  'chart.js',
  angularUiTree,
  toastr,

  //gulp bump
  'testcaserApp.config.generated'
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

export default 'testcaserApp.core';
