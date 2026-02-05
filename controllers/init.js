const fs = require('fs/promises'); // file system module to interact with the file system
const path = require('path'); // track current working directory path

async function initRepo(){
    // get the current working directory path using process.cwd() and resolve it to the .apnaGit directory
    const repoPath = path.resolve(process.cwd(), ".apnaGit" );
    const commitsPath = path.join(repoPath, "commits");

    //check folder creation is successful or not and handle if any..
    try{
        //we can have multiple nested directories
   await fs.mkdir(repoPath, {recursive: true});

   //future me har commit ka data store hoga
   await fs.mkdir(commitsPath, {recursive: true});

   //configuration file : json file to store configuration of file system and s3 details
   await fs.writeFile(
    path.join(repoPath, "config.json"),
    JSON.stringify({ bucket: process.env.S3_BUCKET })
   );

   console.log("repository initalised successfull")

    }catch(err){
  console.error("Error initiallising repository", err);
    }
}
module.exports = {initRepo};

