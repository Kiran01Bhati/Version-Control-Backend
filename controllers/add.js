// no need to create create file just copy the file..
const fs = require('fs').promises;
const path = require('path');

//add file to staging area
async function addRepo(filePath){ //file name provided by user

    const repoPath = path.resolve(process.cwd(), ".apnaGit"); //current working directory.
    const stagingPath = path.join(repoPath, "staging");

    try{

     // create staging folder if not exists    
await fs.mkdir(stagingPath, {recursive: true}); //make folder in stagging 

const fileName = path.basename(filePath);  //we can read file whose path is given

await fs.copyFile(filePath, 
    path.join(stagingPath, fileName)); //create a file which is copy of existing file..
console.log(`file ${fileName} added to the stagging area`);
    }catch (err){ 
console.error("error adding file : ", err);
    }
}
module.exports = {addRepo};