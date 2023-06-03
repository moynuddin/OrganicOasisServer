import express from "express";
import {
  checkOut,
  paymentVerification,
  getKey,
} from "../controllers/paymentController.js";
const paymentRouter = express.Router();

paymentRouter.post("/checkout", checkOut);
paymentRouter.post("/paymentverification", paymentVerification);
paymentRouter.get("/key", getKey);

export default paymentRouter;
