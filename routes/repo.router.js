
const express = require("express");
const repoController = require("../controllers/repoController");
const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepository); //post because hume user se details milne wali like ID
repoRouter.get("/repo/all", repoController.getAllRepositories );
repoRouter.get("/repo/:id", repoController.fetchedRepositoryById);
repoRouter.get("/repo/:name/:name", repoController.fetchedRepositoryByName);
repoRouter.get("/repo/user:userID", repoController.fetchedRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById );
repoRouter.delete("/repo/delete/:id", repoController.deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", repoController.toggleVisibilityById );

module.exports = repoRouter;

//"Kaunsi request → kaunsa function"