
const express = require("express");
const dotenv = require("dotenv");  
const mongoose = require("mongoose");
const cors = require("cors");//cross origin resource sharing used  for security purpose
 const bodyParser = require("body-parser"); //help us to read coming from req. and send data
const http = require("http");
const {Server} = require("socket.io"); //is a js library used for real-time communicatin between client and server

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


dotenv.config(); //jo values .env file me h unko process.env me load kr dega
yargs(hideBin(process.argv))
.command("start", "Starts a new Server", {},startServer)
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
.command(
    'revert <commitID>', 
    'revert to a previous/specific commit',
   (yargs) =>
     {
      yargs.positional("commitID",
        {
      describe: 'commit ID to revert to',
      type: 'string',
        });
     },
     (argv) => {
        revertRepo(argv.commitID);
     }
    )
    
.demandCommand(1, "you need at least one command ")
.help().argv;
function startServer(){
  const app = express();
  const port = process.env.PORT || 3000;

  
  app.use(bodyParser.json());
  app.use(express.json());

  const mongoURL = process.env.MONGODB_URI;
  mongoose.connect(mongoURL).
  then(() => console.log("MongoDB connected!")).
  catch((err) => console.error("Unable to connect :", err));
    console.log()

    //req. kisi bhi location ya url se aa skti h so treated as valid requst

    app.use(cors({ origin: "*"}));
    app.get("/",(req,res) =>{
    res.send("Welcome!");
    });


    let user = "test";
    const httpServer = http.createServer(app);
    const io = new Server( httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
        });

        io.on("connection", (socket) => {
            socket.on("joinRoom", (userID) => {
                user = userID;
                console.log("=====")
                console.log(user);
                console.log("=====")
                socket.join(userID);
            });
        });
        const db = mongoose.connection;

        db.once("open", async() => {
            console.log("CRUD operations called");
            // CRUD operation
        });
        httpServer.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
  }
