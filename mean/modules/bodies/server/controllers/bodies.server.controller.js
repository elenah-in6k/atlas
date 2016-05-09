'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Body = mongoose.model('Body'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Body
 */
exports.create = function(req, res) {
  var body = new Body(req.body);
  body.user = req.user;

  body.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(body);
    }
  });
};

/**
 * Show the current Body
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var body = req.body ? req.body.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  body.isCurrentUserOwner = req.user && body.user && body.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(body);
};

/**
 * Update a Body
 */
exports.update = function(req, res) {
  var body = req.body ;

  body = _.extend(body , req.body);

  body.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(body);
    }
  });
};

/**
 * Delete an Body
 */
exports.delete = function(req, res) {
  var body = req.body ;

  body.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(body);
    }
  });
};

/**
 * List of Bodies
 */
exports.list = function(req, res) { 
  Body.find().sort('-created').populate('user', 'displayName').exec(function(err, bodies) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(bodies);
    }
  });
};

/**
 * Body middleware
 */
exports.bodyByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Body is invalid'
    });
  }

  Body.findById(id).populate('user', 'displayName').exec(function (err, body) {
    if (err) {
      return next(err);
    } else if (!body) {
      return res.status(404).send({
        message: 'No Body with that identifier has been found'
      });
    }
    req.body = body;
    next();
  });
};
