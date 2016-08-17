'use strict';

import routes from './admin.routes';
import AdminController from './admin.controller';

export default angular.module('projectApp.admin', ['projectApp.auth', 'ui.router'])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
