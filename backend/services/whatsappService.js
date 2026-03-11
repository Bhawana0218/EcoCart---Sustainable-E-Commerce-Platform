
import Groq from "groq-sdk";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const processMessage = async (phone, message) => {

  try {
    // 1. quick rule: if the user mentions a specific order ID, answer directly
    const orderIdMatch = message.match(/ORD\d+/i);
    if (orderIdMatch) {
      const order = await Order.findOne({
        orderId: orderIdMatch[0].toUpperCase(),
        customerPhone: phone,
      });
      if (order) {
        return `Your order ${order.orderId} is currently: ${order.status}.`;
      } else {
        return "No order found with that ID.";
      }
    }

    // Get orders from database
    const orders = await Order.find({ customerPhone: phone });
    const products = await Product.find().limit(10);

    let productData = "No products available.";

if (products.length > 0) {
  productData = products
    .map(p => `Product: ${p.name}, Price: ${p.price}`)
    .join("\n");
}

    let orderData = "No orders found.";

    if (orders.length > 0) {
      orderData = orders
        .map(o => `OrderID: ${o.orderId}, Product: ${o.productName}, Status: ${o.status}`)
        .join("\n");
    }
const prompt = `
You are a customer support chatbot for an ecommerce store.

Available Products:
${productData}

Customer Orders:
${orderData}

Customer Question:
${message}

Give a short helpful reply (max 2 lines).
`;

    const chatCompletion = await groq.chat.completions.create({

     messages: [
  {
    role: "system",
    content: `
You are an ecommerce support chatbot.

Rules:
- Give short answers (1–2 sentences only).
- Be clear and direct.
- If order not found, say: "No order found with that ID."
- Do not ask many follow-up questions.
`
  },
  { role: "user", content: prompt }
],

      model: "llama-3.1-8b-instant"

    });

    return chatCompletion.choices[0].message.content;

  } catch (error) {

    console.error("AI error:", error);

    return "Sorry, something went wrong.";
  }
};