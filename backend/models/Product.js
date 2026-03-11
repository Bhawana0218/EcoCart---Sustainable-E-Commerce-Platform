import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  aiClassification: {
    primary_category: {
      type: String,
      default: "General"
    },
    sub_category: {
      type: String,
      default: "General"
    },
    sustainability_filters: {
      type: [String],
      default: []
    }
  },

  aiPrompt: {
    type: String
  },

  aiResponse: {
    type: Object
  },

  price: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

// module.exports = mongoose.model("Product", productSchema);

const Product = mongoose.model("Product", productSchema);
export default Product;