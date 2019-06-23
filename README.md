Serverless SES Forwarder
========================

[![Serverless][ico-serverless]][link-serverless]
[![SemVer](http://img.shields.io/:SemVer-1.0.0-brightgreen.svg)](http://semver.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)][link-license]

This is a simple, serverless email forwarder that uses [Amazon Simple Email Service (Amazon SES)][link-ses-doc]. It was built using the [Serverless][link-serverless] framework, which is used to create an [Amazon CloudFormation][link-cloudformation] stack that includes most of the necessary assets.

Installation
------------

Please review the [Limitations](#limitations) of this project.

### Amazon AWS

1. In [Amazon SES][link-ses-domains], [verify the domains][link-ses-domains-doc] that you want to use to receive and forward emails.
2. If you have a sandbox SES account, you must also [verify the addresses][link-ses-domains-doc] to which you want to forward emails if those addresses are not included in verified domains.
3. If you have not yet configured inbound email handling, you must [create a new Rule Set][link-ses-rules]. Otherwise, you can use an existing one.

### SES Email Forwarder

1. Rename `config.example` to `config.js`, and adjust the configuration.
2. Rename `env.example` to `env.yaml`, and add the name of the Amazon SES Rule Set.
3. Run `sls deploy --stage prod`.

### Configuration

#### env.yaml

Rename `env.example` to `env.yaml`.

The `env.yaml` file provides the [Amazon SES Rule Set Name][link-ses-rules] that will be used by the [Serverless Framework][link-serverless] to create the Receipt Rule that will forward the email.

```yaml
# Prod Stage
prod:
  ses:
    ruleSetName: live-rule-set

# If a stage is not specified, the default value is used.
default:
  ses:
    ruleSetName: default-rule-set
```

It is possible to specify different Rule Set Names for different stages, but
only one Rule Set can be active at a time. It is usually easier to use the same
Rule Set for every stage.

#### config.js

Rename `config.example` to `config.js`.

The `config.js` file specifies how emails should be forwarded.

```javascript
module.exports = {
  default: {
    fromEmail: 'no-reply@verified.domain',
    forwardMapping: {
      '@sentto.example': [
        'address@forwardto.example',
      ],
    },
  },
};
```

It is possible to specify different configurations for different stages.

About
-----

### Limitations

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

License
-------

This project is licensed under the terms of the [MIT license][link-license].


Credits
-------

Shout outs to these talented developers:

* Joe Turgeon (@arithmetic): https://github.com/arithmetic/aws-lambda-ses-forwarder
* Eleven41 Software Inc. (@eleven41): https://github.com/eleven41/aws-lambda-send-ses-email

[ico-serverless]: http://public.serverless.com/badges/v3.svg

[link-cloudformation]: https://aws.amazon.com/cloudformation/
[link-license]: https://github.com/ejsexton82/ses-forwarder/blob/master/LICENSE-MIT
[link-serverless]: http://www.serverless.com/
[link-serverless-aws]: https://serverless.com/framework/docs/providers/aws/guide/credentials/
[link-ses]: https://console.aws.amazon.com/ses/home
[link-ses-doc]: https://aws.amazon.com/ses/
[link-ses-domains]: https://console.aws.amazon.com/ses/home#verified-senders-domain:
[link-ses-domains-doc]: https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domains.html
[link-ses-limits]: https://docs.aws.amazon.com/ses/latest/DeveloperGuide/limits.html
[link-ses-rules]: https://console.aws.amazon.com/ses/home#receipt-rules
