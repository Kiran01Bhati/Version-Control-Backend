//file system module to handle file operations
const fs = require("fs").promises; 
const path = require("path");

const {v4: uuidv4 } = require("uuid");   // to generate unique commit ID   
async function commitRepo(message){
     // Assuming .apnaGit is in the current working directory
    const repoPath = path.resolve(process.cwd(), ".apnaGit"); 

    // copy of the file which is added to staging area
    const stagedPath = path.join(repoPath, "staging"); 

// commits folder where we will store all the commits
    const commitPath = path.join(repoPath, "commits");
try{
    //  generate unique commit ID
const commitID = uuidv4();

// create a directory for the new commit
const commitDir = path.join(commitPath, commitID); 
await fs.mkdir(commitDir, {recursive : true} );

// read all the files in staging area
const files = await fs.readdir(stagedPath); 

for( const file of files){
    // copy each file from staging area to the new commit directory
await fs.copyFile(path.join(stagedPath, file),
path.join(commitDir, file)
);
}
// Create a commit  a JSON file to store commit metadata (message, timestamp, etc.)
    await fs.writeFile(path.join(commitDir, "commit.json"),
   JSON.stringify({message, date: new Date().toISOString()  })
);

console.log(`commit ${commitID} created with message: ${message}`);
}
   catch(err){
    console.error("Error committing files : ", err);
   }
}
module.exports = {commitRepo} ;













































