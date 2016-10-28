import angular from 'angular';

//gulp generated config
import './generated/config.js'; //'testcaserApp.config.generated'

//DI
// angular modules
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';

//reusable custom modules
import common from './common';
import auth from './services/auth/auth.module';
import util from './services/util.service';
import socket from './services/socket.service';
import toasterService from './services/toastr.service';


//3rd party
import uiRouter from 'angular-ui-router';
import angularUiTree from 'angular-ui-tree';
import 'ngsticky'; //sticky
import 'angular-chart.js'; //chart.js
import 'angular-permission'; // 'permission', 'permission.ui'
import 'angular-socket-io'; //'btford.socket-io'
import toastr from 'angular-toastr';
import ngMaterialSidemenu from 'angular-material-sidemenu';
import match from 'angular-validation-match';
import mdDataTable from 'angular-material-data-table';

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
  ngMaterial,
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
  'permission',
  'permission.ui',
  'sticky',
  'chart.js',
  angularUiTree,
  toastr,
  'ngMaterialSidemenu',
  'validation.match',
  'md.data.table',

  //gulp bump
  'testcaserApp.config.generated'
])
  .config(routeConfig)
  .run(function(permissionHelper, version, $rootScope) {
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
