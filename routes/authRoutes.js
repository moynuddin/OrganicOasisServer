import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  profileUser,
  updateProfile,
  forgotPassword,
  adminAccess,
} from "../controllers/authController.js";
import { onlyAdmin, protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", logoutUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.get("/profile", protect, profileUser);
authRouter.post("/update-profile", protect, updateProfile);
authRouter.get("/dashboard", protect, onlyAdmin, adminAccess);

export default authRouter;
