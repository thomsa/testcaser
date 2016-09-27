'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './workspace.routes';

export class WorkspaceComponent {
    /*@ngInject*/
    constructor(projectResource, socket, $state) {
        this.projectResource = projectResource;
        this.socket = socket;

    }

    $onInit() {
        this.projectResource.query((data) => {
            this.projects = data;
            this.socket.syncUpdates('project', this.projects);
        });
    }
}

export default angular.module('testcaserApp.workspace', [uiRouter])
    .config(routes)
    .component('workspace', {
        template: require('./workspace.html'),
        controller: WorkspaceComponent,
        controllerAs: 'workspaceCtrl'
    })
    .name;