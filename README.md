Serverless SES Forwarder
========================

[![Serverless][ico-serverless]][link-serverless]

This is a simple, serverless email forwarder that uses [Amazon Simple Email Service (Amazon SES)][link-ses]. It was built using the [Serverless][link-serverless] framework, which is used to create an [Amazon CloudWatch][link-cloudwatch] stack that includes most of the necessary assets.

Limitations
-----------

### SES Only Sends Emails from Verified Addresses and Domains

This script was designed to forward emails from any sender. In order to
accomplish this, the From and Reply-To headers of the original message are
modified to allow SES to send the email, but also to reflect the original
sender.

So for a message sent from `Some Guy <someguy@unverified.com>` to `info@verified.com`, the From and Reply-To headers will be set to:

```eml
From: Some Guy <noreply@verified.com>
Reply-To: someguy@unverified.com
```

Setup
-----


Credits
-------

Shout outs to these talented developers:

* Joe Turgeon (@arithmetic): https://github.com/aws-lambda-ses-forwarder
* Eleven41 Software Inc. (@eleven41) and Matt Houser (@mwhouser): https://github.com/eleven41/aws-lambda-send-ses-email

License
-------

MIT

[ico-serverless]: http://public.serverless.com/badges/v3.svg

[link-cloudwatch]: https://aws.amazon.com/cloudwatch/
[link-serverless]: http://www.serverless.com/
[link-ses]: https://aws.amazon.com/ses/
