// controller code is written here means konsi command ko kaha redirect krna h

// hum  yargs ka use krte h command line argumentsn ko parse krne ke liye..
const yargs = require('yargs');  

 // hideBin function ko use krke hum process.
 // argv se unnecessary elements ko hata skte h..& actual argument ko read kr skte h.
const {hideBin} = require('yargs/helpers');
const {initRepo} = require('./controllers/init');
const {addRepo} = require('./controllers/add');
const {commitRepo} = require('./controllers/commit');
const {pushRepo} = require('./controllers/push');
const {pullRepo} = require('./controllers/pull');
const {revertRepo} = require('./controllers/revert');

yargs(hideBin(process.argv))
.command("init", "Initialise a new repository", {}, initRepo )

.command("add <file>", 
    "Add a file to the repository",
    (yargs) => 
        {
            yargs.positional("file", {
            describe: "file to add to the staging area",
            type: "string",
            });
        } ,
        (argv) => {  //arguments jo command ke sath aa rhi h
            addRepo (argv.file);
        }
            
    )

.command('commit <message>', 
    'Commit the staged files',
    (yargs) => 
        {
            yargs.positional("message", {
            describe: "commit message",
            type: "string",
            });
        },
            (argv) => {
        commitRepo(argv.message);   // 👈 only string passed
        }
)

    

.command('push', 'push commits to s3', {}, pushRepo)
.command('pull', 'pull commits from s3', {}, pullRepo)
.command('revert <commitId>', 
    'revert to a previous/specific commit',
   (yargs) =>
     {
      yargs.positional("commitId",
        {
      describe: 'commit ID to revert to',
      type: 'string',
        });
     },
      revertRepo
    )
    
.demandCommand(1, "you need at least one command ")
.help().argv;