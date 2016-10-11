'use strict';
const angular = require('angular');

/*@ngInject*/
export function projectResource($resource, $http) {
  var resource = $resource('/api/projects/:id', {
    id: '@_id'
  }, {
    'update': { method: 'PUT', params: { id: '@_id' } }
  });

  resource.testanalysis = function(projectId) {
    return $http({
      method: 'GET',
      url: '/api/projects/' + projectId + '/testanalysis'
    });
  };

  return resource;
}
export default angular.module('testcaserApp.project.service', [])
  .service('projectResource', projectResource)
  .name;
