import Product from "../models/product.model.js";

const getAllProducts = async () => {
  const products = await Product.find();

  return products;
};

const getProductById = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const createProduct = async (productData) => {
  const product = await Product.create(productData);

  return product;
};

const updateProduct = async (productId, productData) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    productData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };