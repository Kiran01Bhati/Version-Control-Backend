const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signUp", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.get("/userProfile/:id", userController.getUsersProfile);
userRouter.put("/updateProfile/:id", userController.updateUsersProfile);
userRouter.delete("/deleteProfile/:id", userController.deleteUsersProfile);

module.exports = userRouter;

//"Kaunsi request → kaunsa function"