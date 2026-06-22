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
try{
const repositories = await Repository.find({})
.populate("owner")
.populate("issues");

res.json(repositories);

}catch{
        console.log("Error during  fetching repositoris! ", err.message);
     res.status(500).send("Server error!");
    }
};
 async function fetchedRepositoryById (req, res){
    const { id } = req.params;

    try{
    const repository = await Repository.find({_id: id})
    //repository ka pura data show ho jaye
    .populate("owner")
    .populate("issues");
    
    
    res.json(repository);
    }catch(err){
     console.log("Error during  fetching repositoris! ", err.message);
     res.status(500).send("Server error!");
     
    }
};

  async function fetchedRepositoryByName (req, res){
    const { name } = req.params;

    try{
    const repository = await Repository.find({ name })
    //repository ka pura data show ho jaye
    .populate("owner")
    .populate("issues");

    res.json(repository);
    }catch(err){
     console.log("Error during  fetching repositoris! ", err.message);
     res.status(500).send("Server error!");
     
    };
};
 async function fetchedRepositoriesForCurrentUser (req, res){
  const { userId } = req.user;

  try{
    const repositories = await Repository.find({ userId : owner });
    if(!repositories || repositories.length == 0){
        returnres.status(404).json({error: "User Repositories not found!"})
    }

    res.json({ message: "Repositories found", repositories });
  }
  catch(err){
     console.log("Error during  fetching user repositoris! ", err.message);
     res.status(500).send("Server error!");
  }
};
 async function updateRepositoryById (req, res){
const { id } = req.params;
const { content, description } = req.body;

try{
const repository = await Repository.findById(id);

 if (!repository){
     return res.status(404).json({error: "Repository not found!"});
}
repository.content.push(content);
repository.description = description;

const updatedRepository = await repository.save(); 

res.json({
    message: "Repository updated successfully!",
    repository: updatedRepository,
});
}catch(err){
    console.log("Error during  updating user repository : ", err.message);
     res.status(500).send("Server error!");
}
};

async function toggleVisibilityById (req, res){
const { id } = req.params;
const { content, description } = req.body;

try{
const repository = await Repository.findById(id);

if (!repository){
     return res.status(404).json({error: "Repository not found!"});
}

const updatedRepository = await repository.save(); 
res.json({
    message: "Repository visibility toggled successfully!",
    repository: updatedRepository,
});
}catch(err){
    console.error("Error during toggling visibility : ", err.message);
     res.status(500).send("Server error!");
}
};
 
 async function deleteRepositoryById (req, res){
   const {id} = req.params;

   try{

    const repository = await Repository.findByIdAndDelete(id);
    if (!repository){
     return res.status(404).json({error: "Repository not found!"});
}

res.json({message:"Repository deleted successfully!"});
   }catch(err){

    console.error("Error during deleting repository!", err.message);
     res.status(500).send("Server error!");
   }
};

module.exports = {
createRepository,
getAllRepositories,
 fetchedRepositoryById,
 fetchedRepositoryByName,
fetchedRepositoriesForCurrentUser,
 updateRepositoryById,
 toggleVisibilityById,
  deleteRepositoryById,

};


/*
find({}) → sab repos fetch
populate() → IDs ko actual data me convert
res.json() → client ko response
*/
