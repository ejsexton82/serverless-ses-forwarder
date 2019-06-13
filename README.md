Serverless SES Forwarder
========================

[![Serverless][ico-serverless]][link-serverless]

This is a simple, serverless email forwarder that uses [Amazon Simple Email Service (Amazon SES)][link-ses-doc]. It was built using the [Serverless][link-serverless] framework, which is used to create an [Amazon CloudWatch][link-cloudwatch] stack that includes most of the necessary assets.

Limitations
-----------

#### SES Only Sends Emails from Verified Addresses and Domains

This script was designed to forward emails from any sender. In order to
accomplish this, the From and Reply-To headers of the original message are
modified to allow SES to send the email, but also to reflect the original
sender.

So for a message sent from `Some Guy <someguy@unverified.com>` to
`info@verified.com`, the From and Reply-To headers will be set to:

```eml
From: Some Guy <noreply@verified.com>
Reply-To: someguy@unverified.com
```

#### SES Only Receives Emails for Verified Addresses and Domains

Domains and addresses must first be verified before they can be used with this
forwarder.

See [Verifying Domains in Amazon SES][link-ses-domains].

#### SES Emails are Limited to 10 MB

This includes attachments after encoding.

See [Limits in Amazon SES][link-ses-limits].

#### New SES Users Start in a Sandbox

Initially, all SES users start in a sandbox environment that has a number of
limitations. Users must submit a support request to have their accounts removed
from the sandbox.

See [Limits in Amazon SES][link-ses-limits].

Set Up
------

### Amazon AWS

1. In [Amazon SES][link-ses-domains], [verify the domains][link-ses-domains-doc] that you want to use to receive and forward emails.
2. If you have a sandbox SES account, you must also [verify the addresses][link-ses-domains-doc] to which you want to forward emails if those addresses are not included in verified domains.
3. If you have not yet configured inbound email handling, you must [create a new Rule Set][link-ses-rules]. Otherwise, you can use an existing one.

### SES Email Forwarder

1. Rename `config.example` to `config.js`, and adjust the configuration.
2. Rename `env.example` to `env.yaml`, and add the name of the Amazon SES Rule Set.
3. Run `sls deploy`.


Credits
-------

Shout outs to these talented developers:

* Joe Turgeon (@arithmetic): https://github.com/arithmetic/aws-lambda-ses-forwarder
* Eleven41 Software Inc. (@eleven41): https://github.com/eleven41/aws-lambda-send-ses-email

License
-------

MIT

[ico-serverless]: http://public.serverless.com/badges/v3.svg

[link-cloudwatch]: https://aws.amazon.com/cloudwatch/
[link-serverless]: http://www.serverless.com/
[link-serverless-aws]: https://serverless.com/framework/docs/providers/aws/guide/credentials/
[link-ses]: https://console.aws.amazon.com/ses/home
[link-ses-doc]: https://aws.amazon.com/ses/
[link-ses-domains]: https://console.aws.amazon.com/ses/home#verified-senders-domain:
[link-ses-domains-doc]: https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domains.html
[link-ses-limits]: https://docs.aws.amazon.com/ses/latest/DeveloperGuide/limits.html
[link-ses-rules]: https://console.aws.amazon.com/ses/home#receipt-rules
