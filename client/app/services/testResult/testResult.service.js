'use strict';
const angular = require('angular');

/*@ngInject*/
export function testResultService($resource) {
    return $resource('/api/test-results/:id', {
        id: '@_id'
    }, {
        'update': { method: 'PUT', params: { id: '@_id' } }
    });
}

export default angular.module('testcaserApp.testResult.service', [])
    .service('testResultResource', testResultService)
    .name;