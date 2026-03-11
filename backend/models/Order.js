import mongoose from "mongoose";
// const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
       orderId: {
    type: String,
   required: true,
    default: () => "ORD" + Math.floor(100 + Math.random() * 900)
  },

  customerPhone: {
    type: String,
    required: true,
    default: "0000000000"
  },

  status: {
    type: String,
    required: true,
    default: "Processing"
  },

  plasticSaved: {
    type: Number,
    required: true,
    default: 0
  },

  carbonSaved: {
    type: Number,
   required: true,
    default: 0

    },

    impactStatement: {
    type: String,
    default: "No impact calculated yet."
  },

  productName: {
    type: String,
    default: "Unknown Product"
  },

  totalAmount: {
    type: Number,
    default: 0
  }
},
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;