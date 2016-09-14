'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('testcaserApp.util', [])
  .factory('Util', UtilService)
  .name;
