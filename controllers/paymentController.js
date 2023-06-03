import crypto from "crypto";
import { instance } from "../app.js";
export const checkOut = async (req, res) => {
  const option = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  try {
    const order = await instance.orders.create(option);

    res.status(200).json({ message: "Order Success!", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const paymentVerification = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.redirect(
      `http://localhost:3000/paymentsuccess?ref=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({ message: "Payment fail!", response });
  }
};

export const getKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};
