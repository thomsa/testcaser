'use strict';
const angular = require('angular');

/*@ngInject*/
export function projectResource($resource) {
  return $resource('/api/projects/:id', {
    id: '@_id'
  },
    {
      'update': { method: 'PUT', params:{ id: '@_id'}}
    });
}

export default angular.module('testcaserApp.project.service', [])
  .service('projectResource', projectResource)
  .name;
