'use strict';
const angular = require('angular');

/*@ngInject*/
export function TeamResource($resource) {
 return $resource('/api/teams/:id', {
    id: '@_id'
  });
}

export default angular.module('testcaserApp.team.service', [])
  .service('teamResource', TeamResource)
  .name;
