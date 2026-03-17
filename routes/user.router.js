const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signUp", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.get("/userProfile", userController.getUsersProfile);
userRouter.put("/updateProfile", userController.updateUsersProfile);
userRouter.delete("/deleteProfile", userController.deleteUsersProfile);

module.exports = userRouter;

//"Kaunsi request → kaunsa function"