

import express from "express";
const router = express.Router();
import { createOrder, getAllOrders } from "../controllers/orderController.js";

router.post("/", createOrder);

router.get("/", getAllOrders);

export default router;