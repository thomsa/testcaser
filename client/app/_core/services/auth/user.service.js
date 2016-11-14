'use strict';

export function UserResource($resource, $http) {
  'ngInject';
  var resource =
    $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });

  resource.removeIntegration = (id, provider) => {
    return $http({
      method: 'POST',
      url: `/api/users/${id}/removeIntegration`,
      data: { provider }
    });
  };

  return resource;
}
