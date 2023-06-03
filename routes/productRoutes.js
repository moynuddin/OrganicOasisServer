import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
const productRouter = express.Router();

productRouter.post("/product", addProduct);
productRouter.get("/products", getProducts);
productRouter.get("/product/:productId", getProductById);
productRouter.put("/product/:productId", updateProduct);
productRouter.delete("/product/:productId", deleteProduct);

export default productRouter;
