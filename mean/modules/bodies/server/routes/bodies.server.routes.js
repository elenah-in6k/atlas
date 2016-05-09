'use strict';

/**
 * Module dependencies
 */
var bodiesPolicy = require('../policies/bodies.server.policy'),
  bodies = require('../controllers/bodies.server.controller');

module.exports = function(app) {
  // Bodies Routes
  app.route('/api/bodies').all(bodiesPolicy.isAllowed)
    .get(bodies.list)
    .post(bodies.create);

  app.route('/api/bodies/:bodyId').all(bodiesPolicy.isAllowed)
    .get(bodies.read)
    .put(bodies.update)
    .delete(bodies.delete);

  // Finish by binding the Body middleware
  app.param('bodyId', bodies.bodyByID);
};
