import Auth from "../models/authModel.js";
import generateToken from "../utils/token.js";

//Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const register = new Auth({ name, email, password, role });
    const record = await Auth.find({ email });
    const alreadyExists = record[0]?.email;
    if (alreadyExists === email) {
      return res.status(200).json({ message: "User already exists" });
    }
    const registeredUser = await register.save();
    if (registeredUser) {
      const { _id, name, email, createdAt, updatedAt } = registeredUser;
      generateToken(res, _id);
      res.status(201).json({ _id, name, email, createdAt, updatedAt });
    }
  } catch (error) {
    console.error("Error in register", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isAuthorized = await Auth.findOne({ email });
    if (!isAuthorized) {
      return res.status(404).json({ message: "Invalid email or password!" });
    }
    const passwordMatch = await isAuthorized.comparePassword(password);

    if (passwordMatch) {
      const { _id, name, email, role, createdAt, updatedAt } = isAuthorized;
      generateToken(res, _id);
      res.status(200).json({ _id, name, email, role, createdAt, updatedAt });
    } else {
      res.status(401).json({ message: "Invalid email or password!" });
    }
  } catch (error) {
    console.error("Error in logging in", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get user profile
export const profileUser = async (req, res) => {
  try {
    const { _id, name, email, createdAt, updatedAt } = req.user;
    res.status(200).json({ _id, name, email, createdAt, updatedAt });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { _id, name, email, password } = req.body;
    const userProfile = await Auth.findById(userId);

    if (!userProfile) {
      res.status(404).json({ message: "User not found!" });
    }

    userProfile.name = name || userProfile.name;
    userProfile.email = email || userProfile.email;
    userProfile.password = password || userProfile.password;

    const updatedUser = await userProfile.save();
    if (updatedUser) {
      const { _id, name, email, createdAt, updatedAt } = updatedUser;
      res.status(200).json({ _id, name, email, createdAt, updatedAt });
    }
  } catch (error) {
    console.error("Not able to update profile", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const alreadyUser = await Auth.findOne({ email });

    if (!alreadyUser) {
      return res.status(404).json({ message: "Email does not exists!" });
    }

    alreadyUser.email = email || alreadyUser.email;
    alreadyUser.password = password || alreadyUser.password;

    const updatedUser = await alreadyUser.save();

    if (updatedUser) {
      res.status(200).json({ message: "Password reset" });
    } else {
      res.status(400).json({ message: "Not able to update password" });
    }
  } catch (error) {
    console.error("Not able to update password", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out!" });
};

export const adminAccess = (req, res) => {
  res.status(200).json({ message: "Access granted!" });
};
