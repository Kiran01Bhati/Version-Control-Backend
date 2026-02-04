// controller code is written here means konsi command ko kaha redirect krna h

// hum  yargs ka use krte h command line argumentsn ko parse krne ke liye..
const yargs = require('yargs');  

 // hideBin function ko use krke hum process.
 // argv se unnecessary elements ko hata skte h..& actual argument ko read kr skte h.
const {hideBin} = require('yargs/helpers');
const {initRepo} = require('./controllers/init');
const {addRepo} = require('./controllers/add');

yargs(hideBin(process.argv)).command('init', 
    'Initialize a new repository', //description
    {}, //parameter
    initRepo // method to execute
    )
.command('add <file>', 
    'Add a file to the repository',(yargs) => 
        {
            yargs.positional("file", {
            describe: "file to add to the staging area",
            type: "string",
            });
        },
            addRepo
    
    
    )


.demandCommand(1, "you need at least one command ")
.help().argv;