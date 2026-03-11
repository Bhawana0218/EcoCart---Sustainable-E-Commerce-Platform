
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { MessageCircle, Send } from "lucide-react";
import axios from "axios";

export default function Conversations() {

  const [conversations, setConversations] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef(null);
  const socketRef = useRef(null); 


   // Connect socket
  useEffect(() => {

    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("newConversation", (conversation) => {
      setConversations((prev) => [...prev, conversation]);
    });

    return () => socketRef.current.disconnect();

  }, []);

  // Fetch initial messages
  const fetchConversations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/whatsapp");
      setConversations(res.data.reverse()); // latest at bottom
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);
 
  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  // Handle sending message
  const handleSend = async () => {
  if (!inputMessage.trim()) return;

  setIsSending(true);

  try {

    await axios.post("http://localhost:5000/api/whatsapp/whatsapp", {
      phone: "1234567890",
      message: inputMessage
    });

    setInputMessage("");

  } catch (err) {

    console.error("send error", err.response?.data || err.message);

  } finally {

    setIsSending(false);

  }
};

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };


  return (
    <div className="p-6 mt-12 bg-gray-900 min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-extrabold text-purple-400 flex items-center gap-3">
          <MessageCircle size={32} className="text-green-400" />
          WhatsApp Chatbot
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-gray-800 shadow-2xl flex flex-col">
        {conversations.length === 0 && (
          <p className="text-gray-400 text-center py-6 italic">No messages yet</p>
        )}

        {conversations.map((c) => (
          <div key={c._id}>
            <ChatBubble text={c.message} from="user" />
            {c.botReply && <ChatBubble text={c.botReply} from="bot" />}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input field */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isSending}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg flex items-center"
          disabled={isSending}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

// Chat bubble component
function ChatBubble({ text, from }) {
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg wrap-break-words
        ${isUser ? "bg-green-500 text-white" : "bg-gray-700 text-gray-200"}`}
      >
        {text}
      </div>
    </div>
  );
}