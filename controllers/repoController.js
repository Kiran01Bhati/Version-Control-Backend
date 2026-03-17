const createRepository = (req, res) => {
    res.send("Repository Created");
};

const getAllRepositories = (req, res) => {
    res.send("Repositries fetched!!");
};

const fetchedRepositoryById = (req, res) => {
    res.send("Repository Details fetched!!");
};

const fetchedRepositoryByName= (req, res) => {
    res.send("Repository Detais fetched!");
};

const fetchedRepositoriesForCurrentUser= (req, res) => {
    res.send("Repository Details fetched!!");
};

const updateRepositoryById = (req, res) => {
    res.send("Repository updated!!");
};
const updateRepositoryByName = (req, res) =>{
    res.send("Repository updated!!");
};

const toggleVisibilityById = (req, res) =>{
    res.send("Visibility Toggled!!");
};
const deleteRepositoryById = (req, res) =>{
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



