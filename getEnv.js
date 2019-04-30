'use strict';

const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const gcs = new Storage({
    keyFilename: '/Users/zach.guthrie/Downloads/test-project-43aa9417647e.json'
});

const dotEnvExists = fs.existsSync('.env');
if (dotEnvExists) {
    console.log('getEnv.js: .env exists, probably running on local environment');
    process.exit();
}

const bucketName = 'envvars-astral-subject-238413';
console.log(`Downloading .env from bucket ${bucketName}`);

gcs
    .bucket(bucketName)
    .file('.env')
    .download({ destination: '.env'})
    .then(() => {
        console.log('getEnv.js: .env downloaded successfully')
    }).catch(e => {
        console.log(`getEnv.js: There was an error: ${JSON.stringify(e, undefined, 2)}`);
    });
