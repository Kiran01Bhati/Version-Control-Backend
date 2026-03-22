 const mongoose = require('mongoose');
 const Repository = require("../models/repoModel");
 const User = require("../models/userModel");
 const Isue = require("../models/issueModel");
 
 async function createRepository (req, res) {
    const { owner, name, issues, content, description, visibility } = req.body;

    try{
        //identifying repository by name
        if(!name){
            return res.status(400).json({error : "Repository name is required!"});
        }

        if(!mongoose.Types.ObjectId.isValid(owner)){
              return res.status(400).json({error : "Invalid user ID!"});
        }

        const newRepository = new Repository({
          name,
           description,
            visibility, 
            owner,
            content,
             issues,
        });
        const result = await newRepository.save();  // saves repository in mongoose

         res.status(201).json({
            message: "Repository created",
            repositoryID: result._id,
         });


    }catch{
        console.log("Error during  repository creation: ", err.message);
     res.status(500).send("Server error!");
    }
};
 async function getAllRepositories (req, res) {
    res.send("Repositries fetched!!");
};
 async function fetchedRepositoryById (req, res){
    res.send("Repository Details fetched!!");
};
 async function fetchedRepositoryByName (req, res){
    res.send("Repository Detais fetched!");
};
 async function fetchedRepositoriesForCurrentUser (req, res){
    res.send("Repository Details fetched!!");
};
 async function updateRepositoryById (req, res){
    res.send("Repository updated!!");
}; async function updateRepositoryByName (req, res){
    res.send("Repository updated!!");
};
 async function toggleVisibilityById (req, res){
    res.send("Visibility Toggled!!");
}; async function deleteRepositoryById (req, res){
    res.send("Repository deleted!!");
};

module.exports = {
createRepository,
getAllRepositories,
 fetchedRepositoryById,
 fetchedRepositoryByName,
fetchedRepositoriesForCurrentUser,
 updateRepositoryById,
 updateRepositoryByName,
 toggleVisibilityById,
  deleteRepositoryById,

};



