'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Body Schema
 */
var BodySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Body name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill Body description',
  },
  function: {
    type: String,
    default: '',
    required: 'Please fill Body function',
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Body', BodySchema);
