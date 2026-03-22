const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
const ObjectId = require("mongodb").ObjectId


dotenv.config(); //get access to the file .env
const uri = process.env.MONGODB_URI;
let client;

//setup connection
async function connectClient(){
    if(!client){
        client = new MongoClient(uri);
            await client.connect();
    }
}

const signUp = async(req, res) => {
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
        starRepos : []
      }
      const result = await usersCollection.insertOne(newUser);

      const token = JWT.sign({id: result.insertedId}, process.env.JWT_SECRET_KEY, {expiresIn:"1h"});
    
    res.json({token});
    }catch(err) {
        console.log("MONGO URI:", process.env.MONGODB_URI);
console.error("Error during signup : ", err.message);
res.status(500).send(("Server error"));
}
};

async function login (req, res) {
    const{ email, password } = req.body;
    try{

        //eastablish connection
        await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        //find user by credentials that means check to see that user is available
        const user = await usersCollection.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials!"});
        }

         const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials!"});
        }
        
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1h"});
        res.json({token, userId:user._id});
    }catch(err){
     console.log("Error during login : ", err.message);
     res.status(500).send("Server error!");
    };
};

async function getAllUsers(req,res) {
    
 try{

await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

const users = await usersCollection.find({}).toArray(); //return a collection of Objects(array)
res.json(users);
 }catch (err){
     console.log("Error during fetching : ", err.message);
     res.status(500).send("Server error!");
    }

};

 async function getUsersProfile(req,res) {
    const currentID = req.params.id;   // URL se id params fetch krega  
 try{
await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");
const user = await usersCollection.findOne({
 _id: new ObjectId(currentID)  //convert id(string) to object id 
});
  if(!user){
            return res.status(404).json({message:"User Not Found!"});
        }
            res.send(user);
 }
 catch (err){
     console.log("Error during fetching : ", err.message);
     res.status(500).send("Server error!");
    }

};


async function updateUsersProfile (req,res) {
    const currentID = req.params.id; // konse user kii profile update krni h 
    const  {email, password} = req.body; //kya update krna h

    try{
    
     await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");
        let updateFields = {email};
        //agr password = true 
        if(password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateFields.password = hashedPassword;
     }

      const result = await usersCollection.findOneAndUpdate({
        _id: new ObjectId(currentID),
      },
      {$set: updateFields },
      {returnDocument: "after"}
    );
    if(!result.value){
        return res.status(404).json({ message: "User not found!"});
    }
    res.send(result.value);
    }catch(err){
   console.error("Error during updating : ",err.message);
   res.status(500).send("server error!");

    }
};

async function deleteUsersProfile (req,res)  {
   const currentID = req.params.id;

   try{
     await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        const result = await usersCollection.deleteOne({
        _id: new ObjectId(currentID),

        });

        if(result.deleteCount == 0){
        return res.status(404).json({ message: "User not found!"});
    }
     
    res.json({message: "User Profile Deleted!"});
   }catch (err){
   console.error("Error during updating : ",err.message);
   res.status(500).send("server error!");
   }


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