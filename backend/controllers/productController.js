
import Product from "../models/Product.js";
import { classifyProduct } from "../services/aiService.js";

export const createProduct = async (req, res) => {
  try {
   
    let aiClassification = {};

    if (req.body && req.body.aiClassification) {
      const { prompt, output } = await classifyProduct(req.body);
      const parsedOutput = JSON.parse(output);
      aiClassification = parsedOutput;
    } else {
      // fallback to flat keys
      aiClassification = {
        primary_category: req.body.primary_category || "General",
        sub_category: req.body.sub_category || "General",
        sustainability_filters: req.body.sustainability_filters || []
      };
    }

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price || 0,
      aiClassification,
      aiPrompt: "",      
      aiResponse: {}     
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: "AI classification failed",
      details: error.message
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Delete failed" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};