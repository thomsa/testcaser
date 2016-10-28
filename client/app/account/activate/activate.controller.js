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
          this.message = data.data.error;
          this.finished = true;
          this.error = true;
        }, 1500);
      } else {
        $timeout(() => {
          this.finished = true;
          this.error = false;
          this.message = 'Your user has been activated! Redirecting you to login page...';
          $timeout(() => {
            $state.go('login');
          }, 3500);
        }, 1500);
      }
    }, error => {
      $timeout(() => {
        this.message = error.data.error;
        this.finished = true;
        this.error = true;
      }, 1500);
    });
  }
}

export default angular.module('testcaserApp.account.activate', [])
  .controller('ActivateController', ActivateController)
  .name;
