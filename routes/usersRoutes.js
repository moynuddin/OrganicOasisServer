import express from "express";
import {
  CreateUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  SearchUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/user", CreateUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/user/search", SearchUser);
userRouter.get("/user/:id", getUserById);
userRouter.put("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);

export default userRouter;
