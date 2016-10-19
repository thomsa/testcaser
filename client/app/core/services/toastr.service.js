'use strict';
const angular = require('angular');

/*@ngInject*/
export function toastrService(toastr) {
  return toastr;
}

export default angular.module('testcaserApp.toastr', [])
  .service('tcToastr', toastrService)
  .name;
