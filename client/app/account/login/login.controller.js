'use strict';
// @flow

type User = {
  name: string;
  email: string;
  password: string;
};

export default class LoginController {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state, permissionHelper, tcToastr) {
    this.Auth = Auth;
    this.$state = $state;
    this.permissionHelper = permissionHelper;
    this.tcToastr = tcToastr;
  }

  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect to home
          this.permissionHelper.setUpPermissionForUser().then(
            loggedIn => {
              this.$state.go('app.workspace');
              this.tcToastr.success("Welcome " + this.Auth.getCurrentUserSync().name + "!", 'Login Successful!');
            },
            loggedOut => {
              //console.log(loggedOut);
            });
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}
