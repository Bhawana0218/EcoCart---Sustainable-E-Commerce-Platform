
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    phone: String,
    message: String,
    botReply: String
  },
  { timestamps: true }
);

export default mongoose.model("ConversationLog", conversationSchema);