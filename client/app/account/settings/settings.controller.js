'use strict';
// @flow

type User = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default class SettingsController {
  user: User = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errors = {
    other: undefined
  };
  message = '';
  submitted = false;
  Auth;

  /*@ngInject*/
  constructor(Auth, $window, User) {
    this.user = Auth.getCurrentUserSync();
    this.Auth = Auth;
    this.$window = $window;
    this.userResource = User;
  }

  connectToThirdParty(provider) {
    this.$window.open('/auth/' + provider + '/connect', '_blank', 'menubar=no');
  }

  removeProvider(provider) {
    this.userResource.removeIntegration(this.user._id, provider).then(data => {
      this.user = this.Auth.getCurrentUserSync();
    });
  }

  changePassword(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}
