'use strict';
const angular = require('angular');

import routes from './projects.routes';
import projectCreateEdit from './project-create-edit/project-create-edit.component';


let _projectResource = Symbol();
let _socket = Symbol();
let _tcToaster = Symbol();

export class ProjectsComponent {
  projectResource;
  socket;
  projects = [];

  /*@ngInject*/
  constructor($scope, datacontext, common, socket, tcToastr) {
    this.actions = [{
      dropdown: false,
      title: 'Create New',
      onclick: () => {
        common.$state.go('app.projects-create');
      }
    }];

    this[_projectResource] = datacontext.projectResource;
    this[_socket] = socket;
    this[_tcToaster] = tcToastr;

    this.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
  }

  $onInit() {
    this[_projectResource].query(data => {
      this.projects = data;
      this[_socket].syncUpdates('project', this.projects, true);
    });
  }

  deleteProject(project) {
    if(confirm('Are you sure to delete the project?')) {
      project.$delete(data => {
        this[_tcToaster].success('Project Deleted', 'Delete Project');
      });
    }
  }


}

export default angular.module('testcaserApp.projects', ['testcaserApp.project-create-edit'])
  .config(routes)
  .component('projects', {
    template: require('./projects.html'),
    controller: ProjectsComponent,
    controllerAs: 'vm',
  })
  .name;
