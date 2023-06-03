import jwt from "jsonwebtoken";
import Auth from "../models/authModel.js";

const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Auth.findById(decode.userId).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };
