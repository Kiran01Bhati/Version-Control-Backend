
const express = require("express");
const issueController = require("../controllers/issueController");
const issueRouter = express.Router();

issueRouter.post("/issue/create", issueController.createIssue);
issueRouter.put("/issue/update/:id", issueController.updateIssuedById );
issueRouter.delete("/issue/delete/:id", issueController.deleteIssuedById);
issueRouter.get("/issue/all/", issueController.getAllIssues);
issueRouter.get("/issue/:id", issueController. getIssueById );

module.exports = issueRouter;

//"Kaunsi request → kaunsa function"