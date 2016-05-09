//Bodies service used to communicate Bodies REST endpoints
(function () {
  'use strict';

  angular
    .module('bodies')
    .factory('BodiesService', BodiesService);

  BodiesService.$inject = ['$resource'];

  function BodiesService($resource) {
    return $resource('api/bodies/:bodyId', {
      bodyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
