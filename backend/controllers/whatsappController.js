
import { processMessage } from "../services/whatsappService.js";
import ConversationLog from "../models/ConversationLog.js";

export const handleMessage = async (req, res) => {
  try {

    const { phone, message } = req.body;

    // get reply from AI
    const reply = await processMessage(phone, message);

    console.log("Bot reply:", reply);

    // save conversation
    const conversation = await ConversationLog.create({
      phone,
      message,
      botReply: reply,
    });

    // emit socket event
    const io = req.app.get("io");
    io.emit("newConversation", conversation);

    // send response
    res.json({ reply });

  } catch (error) {
    console.error("WhatsApp Bot Error:", error);

    res.status(500).json({
      error: "Bot failed",
      details: error.message
    });
  }
};