import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";
import { dbConnect } from "./db.js";
import userRouter from "./routes/usersRoutes.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

const app = express();
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(fileUpload({ useTempFiles: true }));

export const cloud = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

dbConnect(process.env.DB_URI);
const PORT = 5000;

//Routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", paymentRouter);

app.get("/", (req, res) => res.send("Node server is running"));

app.listen(PORT, () => console.log(`Listing on port ${PORT}`));
