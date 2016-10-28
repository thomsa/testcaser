'use strict';
// @flow

type User = {
  name: string;
  email: string;
  password: string;
};

export default class SignupController {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state, $timeout) {
    this.Auth = Auth;
    this.$state = $state;
    this.$timeout = $timeout;
  }

  register(form) {
    this.submitted = true;

    if(form.$valid) {
      this.loading = true;

      return this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          this.$timeout(() => {
            this.loading = false;
          }, 1500);
          // Account created, redirect to login
          this.signUpFinished = true;
        })
        .catch(err => {
          this.$timeout(() => {
            this.loading = false;
          }, 1500);
          err = err.data;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}
