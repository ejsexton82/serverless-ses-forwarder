'use strict';

var LambdaForwarder = require('aws-lambda-ses-forwarder');

module.exports.sesForwarder = function (event, context, callback) {
  // Configure the S3 bucket and key prefix for stored raw emails, and the
  // mapping of email addresses to forward from and to.
  //
  // Expected keys/values:
  // - fromEmail: Forwarded emails will come from this verified address
  // - emailBucket: S3 bucket name where SES stores emails.
  // - emailKeyPrefix: S3 key name prefix where SES stores email. Include the
  //   trailing slash.
  // - forwardMapping: Object where the key is the email address from which to
  //   forward and the value is an array of email addresses to which to send the
  //   message.
  var overrides = {
    config: {
      fromEmail: "no-reply@ejsexton.com",
      subjectPrefix: "",
      emailBucket: process.env.bucketName,
      emailKeyPrefix: "emails/",
      forwardMapping: {
        "@ejsexton.com": [
          "ejsexton82+ejsexton.com@gmail.com"
        ]
      }
    }
  };
  LambdaForwarder.handler(event, context, callback, overrides);
}
