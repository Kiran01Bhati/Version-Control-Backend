const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');


dotenv.config();
const uri = process.env.MONGODB_URL;
let client;

async function connectClient(){
    if(!client){
        client = new MongoClient(uri, 
            {userNewUrlParser:true, 
            useUnifiedTopology:true,
            });
            await client.connect();
    }
}

const  getAllUsers = (req,res) => {
   
};

const signUp = (req, res) => {
    const {username, password, email } = req.body;
    try{
        await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({username});

        if(user){
            return res.status(400).json({message:"User already exists!"});
        }
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
        
       const newUser = {
        username, 
        password:hashedPassword,
        email,
        repositories : [],
        followedUsers :[],
        startRepos : []
      }
      const result = await usersCollection.insertOne(newUser);

      const token = JWT.sign({id:result.insertId})
    }
};

const login = (req, res) => {
    res.send("logging in!");
};


const  getUsersProfile= (req,res) => {
    res.send("Profile fetched!");
};

const  updateUsersProfile = (req,res) => {
    res.send("Profile updated!");
};

const  deleteUsersProfile = (req,res) => {
    res.send("Profile deleted!");
};

module.exports = {
    getAllUsers,
    signUp,
    login,
    getUsersProfile,
    updateUsersProfile,
    deleteUsersProfile,

}

/*
DB se data fetch karega
Validation karega
Business logic handle karega

AUTHENTICATION:-

jsonwebtoken → JWT authentication ke liye
bcryptjs → password hashing ke liye
mongodb → database connect karne ke liye



*/