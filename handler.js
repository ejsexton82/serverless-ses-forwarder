const LambdaForwarder = require('aws-lambda-ses-forwarder');
const config = require('./config');

module.exports.sesForwarder = function (event, context, callback) {
  const overrides = {};
  overrides.config = { ...config.default, ...config[process.env.stage] };
  overrides.config.emailBucket = process.env.bucketName;
  overrides.config.emailKeyPrefix = 'emails/';
  LambdaForwarder.handler(event, context, callback, overrides);
};
