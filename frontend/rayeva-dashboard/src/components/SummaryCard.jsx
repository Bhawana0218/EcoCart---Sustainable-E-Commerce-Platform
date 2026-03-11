import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function SummaryCards() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
    api.get("/orders").then(res => setOrders(res.data));
    api.get("/whatsapp").then(res => setConversations(res.data));
  }, []);

  const totalPlastic = orders.reduce((acc, o) => acc + (Number(o.plasticSaved) || 0), 0);
  const totalCarbon = orders.reduce((acc, o) => acc + (Number(o.carbonSaved) || 0), 0);

  const cardData = [
    { title: "Products", value: products.length, color: "bg-blue-500" },
    { title: "Orders", value: orders.length, color: "bg-green-500" },
    { title: "Conversations", value: conversations.length, color: "bg-purple-500" },
    { title: "Plastic Saved (kg)", value: totalPlastic, color: "bg-yellow-500" },
    { title: "Carbon Reduced (kg)", value: totalCarbon, color: "bg-orange-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {cardData.map((card) => (
        <div key={card.title} className={`${card.color} text-white p-4 rounded-lg shadow-md`}>
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-2xl font-bold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}