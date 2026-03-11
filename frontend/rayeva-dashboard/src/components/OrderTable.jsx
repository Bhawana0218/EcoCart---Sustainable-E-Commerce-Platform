
import React, { useEffect, useState } from "react";
import { 
   Package,
   Phone, 
   CheckCircle, 
   Leaf,
   Cloud,
   ArrowUpDown , 
    } from "lucide-react";

import api from "../api/api";

export default function OrderTable({ orders: propOrders }) {

  const [orders, setOrders] = useState(propOrders || []);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDragEnd = (result) => {
  if (!result.destination) return; 
  const items = Array.from(orders);
  const [reorderedItem] = items.splice(result.source.index, 1); 
  items.splice(result.destination.index, 0, reorderedItem); 
  setOrders(items); 
  }
  

  useEffect(() => {
    fetchOrders();
  }, []);



  const fetchOrders = () => {
    console.log("Fetching orders...");

    api
      .get("/orders")
      .then((res) => {
        console.log("Orders fetched:", res.data);
      //   setOrders(res.data);
      // })
      const fixedOrders = res.data.map((o) => ({
        ...o,
        orderId: o.orderId || "ORD" + Math.floor(100 + Math.random() * 900),
        customerPhone: o.customerPhone || "N/A",
        plasticSaved: o.plasticSaved || 0,
        carbonSaved: o.carbonSaved || 0
      }));

      setOrders(fixedOrders);
    })
      .catch((err) => {
        console.error("Error fetching orders:", err.message);
        setError(err.message);
      })
      .finally(() => {
        console.log("Setting loading to false");
        setLoading(false);
      });
    }

      const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };


  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-emerald-600 text-white",
      pending: "bg-amber-600 text-white",
      processing: "bg-blue-600 text-white",
      cancelled: "bg-red-600 text-white",
      delivered: "bg-emerald-600 text-white",
    };
    return colors[status?.toLowerCase()] || "bg-gray-600 text-white";
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: CheckCircle,
      pending: Package,
      processing: Cloud,
      cancelled: Package,
      delivered: CheckCircle,
    };
    const Icon = icons[status?.toLowerCase()] || Package;
    return Icon;
  };

  if (loading)
    return <p className="text-center p-4 text-gray-300">Loading orders...</p>;
  if (error)
    return <p className="text-center p-4 text-red-400">Error: {error}</p>;

  

  return (
    <div className="overflow-x-auto rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 bg-gray-900">
      <table className="min-w-full">
        <thead>
          <tr className="bg-linear-to-r from-gray-800 via-emerald-900 to-gray-800">
            <th
              className="p-5 text-left cursor-pointer group hover:bg-gray-700/50 transition-colors duration-300"
              onClick={() => handleSort("orderId")}
            >
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <Package className="w-5 h-5" />
                <span>Order ID</span>
                <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </th>
            <th
              className="p-5 text-left cursor-pointer group hover:bg-gray-700/50 transition-colors duration-300"
              onClick={() => handleSort("customerPhone")}
            >
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <Phone className="w-5 h-5" />
                <span>Customer Phone</span>
                <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </th>
            <th
              className="p-5 text-left cursor-pointer group hover:bg-gray-700/50 transition-colors duration-300"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Status</span>
                <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </th>
            <th
              className="p-5 text-left cursor-pointer group hover:bg-gray-700/50 transition-colors duration-300"
              onClick={() => handleSort("plasticSaved")}
            >
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <Leaf className="w-5 h-5" />
                <span>Plastic Saved (kg)</span>
                <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </th>
            <th
              className="p-5 text-left cursor-pointer group hover:bg-gray-700/50 transition-colors duration-300"
              onClick={() => handleSort("carbonSaved")}
            >
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <Cloud className="w-5 h-5" />
                <span>Carbon Saved (kg)</span>
                <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </th>
          </tr>
        </thead>


        <tbody>
          {orders.map((o, index) => {
            const StatusIcon = getStatusIcon(o.status);
            return (
              <tr
                key={o._id}
                className={`group cursor-pointer transition-all duration-300 border-b border-emerald-500/10 ${
                  hoveredRow === o._id
                    ? "bg-emerald-900/30"
                    : index % 2 === 0
                    ? "bg-gray-800/50"
                    : "bg-gray-800/30"
                }`}
                onMouseEnter={() => setHoveredRow(o._id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        hoveredRow === o._id ? "bg-emerald-500/20" : "bg-emerald-500/10"
                      }`}
                    >
                      <Package
                        className={`w-5 h-5 transition-colors duration-300 ${
                          hoveredRow === o._id ? "text-emerald-300" : "text-emerald-400"
                        }`}
                      />
                    </div>
                    <span
                      className={`font-mono transition-colors duration-300 ${
                        hoveredRow === o._id ? "text-emerald-200" : "text-gray-200"
                      }`}
                    >
                      {o.orderId || "ORD" + Math.floor(100 + Math.random() * 900)}
                    </span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        hoveredRow === o._id ? "bg-green-500/20" : "bg-green-500/10"
                      }`}
                    >
                      <Phone
                        className={`w-5 h-5 transition-colors duration-300 ${
                          hoveredRow === o._id ? "text-green-300" : "text-green-400"
                        }`}
                      />
                    </div>
                    <span
                      className={`font-mono transition-colors duration-300 ${
                        hoveredRow === o._id ? "text-green-200" : "text-gray-200"
                      }`}
                    >
                      {o.customerPhone || "0000000000"}
                    </span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        hoveredRow === o._id ? "bg-teal-500/20" : "bg-teal-500/10"
                      }`}
                    >
                      <StatusIcon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          hoveredRow === o._id ? "text-teal-300" : "text-teal-400"
                        }`}
                      />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        o.status
                      )} shadow-lg`}
                    >
                      {o.status || "Processing"}
                    </span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        hoveredRow === o._id ? "bg-lime-500/20" : "bg-lime-500/10"
                      }`}
                    >
                      <Leaf
                        className={`w-5 h-5 transition-colors duration-300 ${
                          hoveredRow === o._id ? "text-lime-300" : "text-lime-400"
                        }`}
                      />
                    </div>
                    <span
                      className={`font-semibold transition-colors duration-300 ${
                        hoveredRow === o._id ? "text-lime-200" : "text-gray-200"
                      }`}
                    >
                      {Number(o.plasticSaved || 0).toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        hoveredRow === o._id ? "bg-cyan-500/20" : "bg-cyan-500/10"
                      }`}
                    >
                      <Cloud
                        className={`w-5 h-5 transition-colors duration-300 ${
                          hoveredRow === o._id ? "text-cyan-300" : "text-cyan-400"
                        }`}
                      />
                    </div>
                    <span
                      className={`font-semibold transition-colors duration-300 ${
                        hoveredRow === o._id ? "text-cyan-200" : "text-gray-200"
                      }`}
                    >
                      {Number(o.carbonSaved || 0).toFixed(2)}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}






