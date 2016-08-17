'use strict';

import LoginController from './login.controller';

export default angular.module('projectApp.login', [])
  .controller('LoginController', LoginController)
  .name;
