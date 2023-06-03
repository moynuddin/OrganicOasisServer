import User from "../models/user.js";

//Create new User
export const CreateUser = async (req, res) => {
  try {
    const { name, email, country } = req.body;
    const newUser = new User({ name, email, country });
    const records = await User.find({ email });
    let existingEmail = records[0]?.email;
    if (existingEmail === email) {
      return res.status(200).json({ message: "User already exists!" });
    }
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error, "Error creating new user");
    res.status(500).json({ error: "Server error" });
  }
};

//Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length < 1) {
      return res.status(200).json({ message: "User list empty!" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({ message: "Not able to fetch users!" });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Update User
export const updateUser = async (req, res) => {
  try {
    const { name, email, country } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, country },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.log("Error in server", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log("Error in server", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Search users
export const SearchUser = async (req, res) => {
  try {
    const { data } = req.query;
    const searchedUser = await User.find({
      $or: [
        { name: { $regex: data, $options: "i" } },
        { email: { $regex: data, $options: "i" } },
        { country: { $regex: data, $options: "i" } },
      ],
    });
    res.status(200).json(searchedUser);
  } catch (error) {
    console.log("Error in searching", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
