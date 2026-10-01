import express from "express";

import getProducts from "../controllers/product/getProducts.controller.js";
import getproductById from "../controllers/product/getProductById.controller.js";
import createProduct from "../controllers/product/createProduct.controller.js";
import updateProduct from "../controllers/product/updateProduct.controller.js";
import deleteProduct from "../controllers/product/deleteProduct.controller.js";

import validateMiddleware from "../middlewares/validation.middleware.js";
import verifyTokenMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";


import { createProductSchema, updateProductSchema, } from "../validations/product.validation.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getproductById);

router.post("/", verifyTokenMiddleware,
    upload.single("image"), validateMiddleware(createProductSchema), createProduct);

router.put("/:id", verifyTokenMiddleware,
    upload.single("image"), validateMiddleware(updateProductSchema), updateProduct);

router.delete("/:id", verifyTokenMiddleware, deleteProduct);

export default router;