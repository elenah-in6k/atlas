(function () {
  'use strict';

  // Bodies controller
  angular
    .module('bodies')
    .controller('BodiesController', BodiesController);

  BodiesController.$inject = ['$scope', '$state', 'Authentication', 'bodyResolve'];

  function BodiesController ($scope, $state, Authentication, body) {
    var vm = this;

    vm.authentication = Authentication;
    vm.body = body;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Body
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.body.$remove($state.go('bodies.list'));
      }
    }

    // Save Body
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bodyForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.body._id) {
        vm.body.$update(successCallback, errorCallback);
      } else {
        vm.body.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('bodies.view', {
          bodyId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
