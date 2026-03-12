const fs = require('fs');
const path = require('path');
//promisify is used to check if the file exist or not which is commited
//util is module provide existing things
const {promisify} = require("util");//


const readdir = promisify(fs.readdir); 
const copyFile = promisify(fs.copyFile);



async function revertRepo(commitID){
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");

try{
const commitDir = path.join(commitsPath, commitID);
const files = await readdir(commitDir);

// ek folder ke bhar jana h jaha revert and replacekarna h
const parentDir = path.resolve(repoPath, "..");

//copy everything from commits folder to parents folder
for( const file of files){
    await copyFile(path.join(commitDir, file), path.join(parentDir,file));
}
console.log(`Commit ${commitID} reverted successfully!`);

}catch (err){
console.error("Unable to revert" , err);
}
}
module.exports = {revertRepo};