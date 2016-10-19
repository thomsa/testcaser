'use strict';
const angular = require('angular');

import permissionHelper from './permissionHelper.service';

/*@ngInject*/
export function servicesService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default angular.module('testcaserApp.services', [
  permissionHelper
])
  .service('services', servicesService)
  .name;
