'use strict';
import './app.scss';
import '../../server/shared/extensions.js';

//DI
// ANGULAR
import angular from 'angular';
//CORE
import core from './_core/core.module';
import components from './_components/components.module';
import datacontext from './_datacontext/datacontext.module';
//FEATURE MODULES
import account from './account/account.module';
import layouts from './layouts/layouts.component';
import testSuites from './test-suites/test-suites.component';
import projects from './projects/projects.component';
import workSpace from './workspace/workspace.component';
import playTestsuite from './play-testsuite/play-testsuite.component';

angular.module('testcaserApp', [
  /*
  * Core modules
  */
  core,
  components,
  datacontext,
  /*
  * Features
  */
  account,
  layouts,
  playTestsuite,
  projects,
  testSuites,
  workSpace,
]);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['testcaserApp'], {
      strictDi: true
    });
  });
