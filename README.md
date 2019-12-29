# SendGrid API Lambda Proxy

Used to proxy SendGrid API request.

## Instructions

* Copy .env_ci to .env
* Change values for .env/env.qa.json, .env/env.dev.json, and .env/env.production.json as required for your proxy
* yarn
* yarn build
* If you want to try it out locally, in src/index.js uncomment line 55 and comment line 56 (remember to undo this before deployment to aws)
* yarn start

## Deploying

The environment json files configure your serverless.yaml file. The environment variable SLS_ENV determines which file is used. For example, to launch using your env.qa.json file, you would do as follows:

* SLS_ENV=qa yarn deploy

If this is the first time you're deploying, you'll need to create the custom domain in the API Gateway.

* SLS_ENV=qa sls create_domain

## Dependencies/Assumptions

* Assumes you have serverless installed
* Assumes you have serverless configured with AWS credentials to deploy lambda functions
* Assumes you have permissions to create a route53 entry, a custom domain in API Gateway, new Cloud Formation, and Lambda