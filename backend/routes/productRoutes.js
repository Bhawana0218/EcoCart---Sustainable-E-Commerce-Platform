
import express from "express";
const router = express.Router();

import {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct } from "../controllers/productController.js";

router.post("/", createProduct);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);   
router.put("/:id", updateProduct); 

export default router;