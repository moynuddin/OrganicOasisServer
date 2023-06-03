import Product from "../models/products.js";
import cloudinary from "cloudinary";

//Add product
export const addProduct = async (req, res) => {
  const { name, price, quantity, desc, category } = req.body;
  const file = req.files.image;
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "DEV",
      transformation: [
        { width: 350, height: 400, crop: "scale" },
        { quality: "auto" },
        { format: "jpg" },
      ],
    });

    const product = new Product({
      name,
      price,
      quantity,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      desc,
      category,
    });

    const savedProduct = await product.save();

    res.status(201).send(savedProduct);
  } catch (error) {
    console.error("Error in add product", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

//Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) return res.status(200).send(products);

    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

//Get product by ID
export const getProductById = async (req, res) => {
  const id = req.params.productId;

  try {
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (error) {
    console.log("Error fetching product by id", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Update product
export const updateProduct = async (req, res) => {
  const { name, price, quantity, desc } = req.body;
  const file = req.files.image;
  try {
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "DEV",
      transformation: [
        { width: 350, height: 400, crop: "scale" },
        { quality: "auto" },
        { format: "jpg" },
      ],
    });

    const id = req.params.productId;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        quantity,
        desc,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      },
      { new: true }
    );
    console.log(updatedProduct);
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

//Delete product
export const deleteProduct = async (req, res) => {
  const id = req.params.productId;

  try {
    const deletedProduct = await Product.findOneAndDelete(id);
    if (deleteProduct._id) {
      res.status(200).json({ message: "Product deleted!" });
    } else {
      res.status(200).json({ message: "Not able to delete product" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
