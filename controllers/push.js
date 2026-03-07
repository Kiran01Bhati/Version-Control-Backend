const fs = require('fs').promises;
const path  = require('path');
const {s3, s3_Bucket } = require("../config/aws-config");


async function pushRepo(){
 //read file from current working directory
 const repoPath = path.resolve(process.cwd(), "apnaGit");

 //commits path = commits folder inside repoPath
 const commitsPath = path.join(repoPath, "commits");

try{

}catch(err){
    console.error("Error pushing to s3:", err);
}

}
module.exports = {pushRepo};