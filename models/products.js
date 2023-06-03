import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Vegetables", "Fruits", "Snacks", "Beverages"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);

export default Product;
