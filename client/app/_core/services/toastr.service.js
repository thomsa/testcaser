'use strict';
const angular = require('angular');

/*@ngInject*/
export function toastrService($mdToast) {
  var toastr = {
    success
  };

  function success(message, title) {
    $mdToast.showSimple({message: message, position: 'right'});
  }

  return toastr;
}

export default angular.module('testcaserApp.toastr', [])
  .service('tcToastr', toastrService)
  .name;
