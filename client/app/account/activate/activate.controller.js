'use strict';
const angular = require('angular');

/*@ngInject*/
export function activateController($stateParams, $http) {
  var email = $stateParams.email;
  var token = $stateParams.token;

  $http.post('/api/users/activate/', {email, token}).then(data => {
    if(data.error) {
      console.log(data.error);
    }
    else {
      console.log(data);
    }
  }, error => {
    console.log(error);
  });
}

export default angular.module('testcaserApp.account.activate', [])
  .controller('ActivateController', activateController)
  .name;
