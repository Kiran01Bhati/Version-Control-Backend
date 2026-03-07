// code of aws connection code like connect with account/bucket

const AWS = require("aws-sdk");

// Set the AWS region and credentials according to target audiencenot not to develeopment
AWS.config.update({ region: "ap-south-1" });

const s3 = new AWS.S3();
const S3_BUCKET = "testsamplebucketkiran";

module.exports = { s3, S3_BUCKET };