// code of aws connection code like connect with account/bucket
require("dotenv").config();
const AWS = require("aws-sdk");


// Set the AWS region and credentials according to target audiencenot not to develeopment
AWS.config.update({ 
    
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region:process.env.AWS_REGION
});

const s3 = new AWS.S3();
const S3_BUCKET = process.env.S3_BUCKET;

module.exports = { s3, S3_BUCKET };