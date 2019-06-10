'use strict';

var LambdaForwarder = require('aws-lambda-ses-forwarder');
var config = require('./config');

module.exports.sesForwarder = function (event, context, callback) {
  var overrides = {};
  overrides.config = {...config.default, ...config[process.env.stage]};
  overrides.config.emailBucket = process.env.bucketName;
  overrides.config.emailKeyPrefix = "emails/";
  LambdaForwarder.handler(event, context, callback, overrides);
}
