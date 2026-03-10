const fs = require('fs').promises;
const path  = require('path');
const {s3, s3_Bucket, S3_BUCKET } = require("../config/aws-config");


async function pushRepo(){
 //read file from current working directory
 const repoPath = path.resolve(process.cwd(), ".apnaGit");

 //commits path = commits folder inside repoPath
 const commitsPath = path.join(repoPath, "commits");


try{
    //jitni files hain commits folder mein, unko read karenge and push karenge
    const commitDirs  = await fs.readdir(commitsPath);

  //outer loop to read each commit directory
  for(const commitDir of commitDirs){
const commitPath  = path.join(commitsPath, commitDir);
const files = await fs.readdir(commitPath);
//inner loop to read each file inside commit directory
for(const file of files) {
const filePath = path.join(commitPath, file);

//read file content
const fileContent  = await fs.readFile(filePath);

//actaul properties for uploading to AWS 
const params = {
  Bucket: S3_BUCKET,

  //folder structure in s3 will be commits/commitDir/file
  Key : `commits/${commitDir}/${file}`,
  Body : fileContent,

};
await s3.upload(params).promise();

}
}

console.log("All Commits pushed to s3 Successfully!");


}catch(err){
  //we will log the error if any error occurs
    console.error("Error pushing to s3:", err);
}

}
module.exports = {pushRepo};