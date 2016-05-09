(function () {
  'use strict';

  angular
    .module('bodies')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Bodies',
      state: 'bodies',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'bodies', {
      title: 'List Bodies',
      state: 'bodies.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'bodies', {
      title: 'Create Body',
      state: 'bodies.create',
      roles: ['user']
    });
  }
})();
