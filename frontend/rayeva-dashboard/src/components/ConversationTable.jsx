
import React, { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { io } from "socket.io-client";
import { Send } from "lucide-react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const socket = io("https://ecocart-sustainable-e-commerce-platform-1.onrender.com/api", {
  transports: ["websocket"], 
});

export default function ConversationTable() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef(null);

  // Fetch initial conversations
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/whatsapp");
        setConversations(res.data.reverse());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Listen for new messages from backend
  useEffect(() => {
    socket.on("newConversation", (conversation) => {
      setConversations((prev) => [...prev, conversation]);
    });
    return () => socket.off("newConversation");
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  // Send message to backend
  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    setIsSending(true);
    try {
      await api.post("/whatsapp/whatsapp", {
        phone: "1234567890", // replace with dynamic user if needed
        message: inputMessage,
      });
      setInputMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  if (loading)
    return <p className="text-center p-4 text-gray-200">Loading conversations...</p>;
  if (error)
    return <p className="text-center p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col h-150 bg-gray-900 rounded-xl shadow-2xl p-4">
      <div className="flex-1 overflow-y-auto flex flex-col">
        {conversations.length === 0 && (
          <p className="text-gray-400 text-center mt-4">No messages yet</p>
        )}
        {conversations.map((c) => (
          <div key={c._id}>
            <ChatBubble text={c.message} from="user" />
            {c.botReply && <ChatBubble text={c.botReply} from="bot" />}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="flex mt-4 gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSending}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 px-4 py-2 rounded-lg flex items-center hover:bg-green-600"
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
        className={`max-w-xs px-4 py-2 rounded-lg wrap-break-words ${
          isUser ? "bg-green-500 text-white" : "bg-gray-800 text-gray-200"
        }`}
      >
        {text}
      </div>
    </div>
  );
}