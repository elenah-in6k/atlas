(function () {
  'use strict';

  angular
    .module('bodies')
    .controller('BodiesListController', BodiesListController);

  BodiesListController.$inject = ['BodiesService'];

  function BodiesListController(BodiesService) {
    var vm = this;

    vm.bodies = BodiesService.query();
  }
})();
