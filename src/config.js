const fs = require('fs');
const env = process.env.NODE_ENV || 'dev';
const dir = (fs.existsSync('./.env')) ? '.env' : '.env_ci';
const envVars = require(`../${dir}/env.${env}`);

const config = {
    ENV: process.env.NODE_ENV || envVars.NODE_ENV || 'dev',
    SG_API: process.env.SG_API || envVars.SG_API || 'SENDGRIDAPIID',
    SG_URL: process.env.SG_URL || envVars.SG_URL || 'api.sendgrid.com',
    SG_VERSION: process.env.SG_VERSION || envVars.SG_VERSION || 'v3',
    CUSTOM_DOMAIN: process.env.CUSTOM_DOMAIN || envVars.CUSTOM_DOMAIN || 'example.com'
};

module.exports = config;