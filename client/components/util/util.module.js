'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('projectApp.util', [])
  .factory('Util', UtilService)
  .name;
