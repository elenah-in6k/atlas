(function () {
  'use strict';

  angular
    .module('bodies')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('bodies', {
        abstract: true,
        url: '/bodies',
        template: '<ui-view/>'
      })
      .state('bodies.list', {
        url: '',
        templateUrl: 'modules/bodies/client/views/list-bodies.client.view.html',
        controller: 'BodiesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Bodies List'
        }
      })
      .state('bodies.create', {
        url: '/create',
        templateUrl: 'modules/bodies/client/views/form-body.client.view.html',
        controller: 'BodiesController',
        controllerAs: 'vm',
        resolve: {
          bodyResolve: newBody
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Bodies Create'
        }
      })
      .state('bodies.edit', {
        url: '/:bodyId/edit',
        templateUrl: 'modules/bodies/client/views/form-body.client.view.html',
        controller: 'BodiesController',
        controllerAs: 'vm',
        resolve: {
          bodyResolve: getBody
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Body {{ bodyResolve.name }}'
        }
      })
      .state('bodies.view', {
        url: '/:bodyId',
        templateUrl: 'modules/bodies/client/views/view-body.client.view.html',
        controller: 'BodiesController',
        controllerAs: 'vm',
        resolve: {
          bodyResolve: getBody
        },
        data:{
          pageTitle: 'Body {{ articleResolve.name }}'
        }
      });
  }

  getBody.$inject = ['$stateParams', 'BodiesService'];

  function getBody($stateParams, BodiesService) {
    return BodiesService.get({
      bodyId: $stateParams.bodyId
    }).$promise;
  }

  newBody.$inject = ['BodiesService'];

  function newBody(BodiesService) {
    return new BodiesService();
  }
})();
