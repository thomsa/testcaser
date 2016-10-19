'use strict';

import angular from 'angular';

export default angular.module('testcaserApp.constants', [])
  .constant('appConfig', require('../../../server/config/environment/shared'))
  .name;
