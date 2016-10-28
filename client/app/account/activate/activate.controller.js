'use strict';
const angular = require('angular');


export class ActivateController {
  constructor($stateParams, $http, $timeout, $state) {
    'ngInject';
    this.email = $stateParams.email;
    this.token = $stateParams.token;
    this.finished = false;

    $http.post('/api/users/activate/', { email: this.email, token: this.token }).then(data => {
      if(data.error) {
        $timeout(() => {
          this.errorMessage = data.data.error;
          this.finished = true;
        }, 2000);
      } else {
        $timeout(() => {
          this.finished = true;
          $state.go('login');
        }, 2000);
      }
    }, error => {
      $timeout(() => {
        this.errorMessage = error.data.error;
        this.finished = true;
      }, 2000);
    });
  }
}

export default angular.module('testcaserApp.account.activate', [])
  .controller('ActivateController', ActivateController)
  .name;
