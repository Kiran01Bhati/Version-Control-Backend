const fs = require('fs').promises;
const path = require('path');
// Import the AWS S3 configuration
const { s3, S3_BUCKET } = require('../config/aws-config');
const { S3 } = require('aws-sdk');

// Function to pull a file from S3 and save it locally
async function pullRepo() 
{
const repoPath = path.resolve(process.cwd(), ".apnaGit");
const commitsPath = path.join(repoPath, "commits");
try
{
    // list objects in the commits folder of the S3 bucket
const data = await 
s3.listObjectsV2({ 
    Bucket: S3_BUCKET, 
    Prefix: "commits/"
})
.promise();
//this will give us the list of objects in the commits folder, we can then download each object and save it locally
const objects = data.Contents;
for(const object of objects){
    const key = object.Key; // get the key of the object
    const commitDir = path.join(
    commitsPath,
     path.dirname(key).split("/").pop() //dirname will give us the path of the object, we can then split it and get the last part which is the commit id
);
await fs.mkdir(commitDir,{recursive: true});//folder will be created if it does not exist nested bhi ho skte
const params = {
    Bucket: S3_BUCKET,
    Key: key,
};

//get the object from s3 and save it locally
const fileContent = await s3.getObject(params).promise();
//write the file content to the local file system
await fs.writeFile
(path.join(repoPath, key),
 fileContent.Body);
console.log("All commits pulled  from S3 successfully");
}
} catch (err){
    console.log("Unable to pull : ", err);
}



}



module.exports = { pullRepo };