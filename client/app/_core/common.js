'use strict';
const angular = require('angular');

function common($q, $timeout, $state, $stateParams) {
  return {
    $q,
    $timeout,
    $state,
    $stateParams,
  };
}

export default angular.module('testcaserApp.helper.common', [])
  .factory('common', common)
  .name;
