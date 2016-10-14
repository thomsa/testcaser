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
  constructor(Auth, $state, permissionHelper) {
    this.Auth = Auth;
    this.$state = $state;
    this.permissionHelper = permissionHelper;
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
              //  toastr.success("Welcome " + $sessionStorage.user.User.Name + "!", 'Login Successful!');
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
