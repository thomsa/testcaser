'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './projects.routes';


import projectCreateEdit from './project-create-edit/project-create-edit.component';


export class ProjectsComponent {
  projectResource;
  socket;
  projects = [];

  /*@ngInject*/
  constructor(datacontext, common) {
    this.actions = [{
      dropdown: false,
      title: 'Create New',
      onclick: () => {
        $state.go('app.projects-create');
      }
    }
      // ,
      // {
      //   dropdown: true, title: "dropdown" ,
      //   dropdownElements: [{title : "first dropdown" , onclick : () => {alert('clicked')}} , {divider:true},
      //   {title : "second dropdown" , onclick : () => {alert('clicked')}} ]
      // }
    ];

    this.projectResource = datacontext.projectResource;
    this.socket = common.socket;
  }

  $onInit() {
    this.projectResource.query(data => {
      this.projects = data;
      this.socket.syncUpdates('project', this.projects, true);
    });
  }

  addProject() {
    this.projects.push({});
  }

  deleteProject(project) {
    if(confirm('Are you sure to delete the project?')) {
      project.$delete(data => {
        //TODO: put toaster here

      });
    }
  }

}

export default angular.module('testcaserApp.projects', [uiRouter, 'testcaserApp.project.service', 'testcaserApp.project-create-edit'])
  .config(routes)
  .component('projects', {
    template: require('./projects.html'),
    controller: ProjectsComponent
  })
  .name;
