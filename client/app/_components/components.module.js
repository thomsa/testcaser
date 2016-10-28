import angular from 'angular';


//COMPONENTS
import actionNav from './action-nav/action-nav.component';
import footer from './footer/footer.component';
import modal from './modal/modal.service';
import mongooseError from './mongoose-error/mongoose-error.directive';
import navbar from './navbar/navbar.component';
import oauthButtons from './oauth-buttons';
import openWindow from './open-window/open-window.directive';
import timer from './timer/timer.component';

export default angular.module('testCaser.components', [
  actionNav,
  footer,
  modal,
  mongooseError,
  navbar,
  oauthButtons,
  openWindow,
  timer
]).name;
