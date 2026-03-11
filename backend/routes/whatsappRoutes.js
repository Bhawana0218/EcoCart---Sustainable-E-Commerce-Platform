
import express from "express";
import { handleMessage } from "../controllers/whatsappController.js";
import ConversationLog from "../models/ConversationLog.js";

const router = express.Router();

router.post("/whatsapp", handleMessage);

router.get("/", async (req, res) => {
  const conversations = await ConversationLog.find().sort({ createdAt: -1 });
  res.json(conversations);
});

export default router;