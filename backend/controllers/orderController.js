
import Order from "../models/Order.js";
 import  calculateImpact  from "../services/impactService.js";

export const createOrder = async (req, res) => {

  try {

    let {
      orderId,
      customerPhone,
      status,
      plasticSaved,
      carbonSaved,
      totalAmount,
      material,
    } = req.body;

   
    if (!customerPhone) {
      customerPhone = "0000000000";
    }

    //Get last order
    const lastOrder = await Order.findOne().sort({ orderId: -1 });

    let newOrderId = "ORD111";

    if (lastOrder && lastOrder.orderId) {
      const lastNumber = parseInt(lastOrder.orderId.replace("ORD", ""));
      const nextNumber = lastNumber + 1;
      newOrderId = "ORD" + String(nextNumber).padStart(3, "0");
    }


    const impact = calculateImpact({ material });

    const order = await Order.create({
      orderId: newOrderId,
      customerPhone,
      status: status || "Processing",
      totalAmount: totalAmount || 0,
      plasticSaved: Number(impact?.plasticSaved) || 0,
      carbonSaved: Number(impact?.carbonSaved) || 0,
      impactStatement:
        impact?.impactStatement ||
        "This order supports sustainable commerce.",
    });

    res.status(201).json(order);

  } catch (error) {

    console.error("Order creation error:", error);
    res.status(500).json({
      error: "Order creation failed",
    });
  }

};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
    error: "Failed to fetch orders" });
  }
};


