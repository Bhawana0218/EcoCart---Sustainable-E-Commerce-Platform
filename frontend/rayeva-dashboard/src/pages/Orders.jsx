import React, { useState, useEffect } from "react";
import OrderTable from "../components/OrderTable";
import { CSVLink } from "react-csv";
import { ShoppingCart, RefreshCw} from 'lucide-react';
import api from "../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

   const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      fetchOrders(); 
      setSearch("");
      setIsRefreshing(false);
    }, 1000);
  };

  if (loading) return <p className="text-center p-6">Loading orders...</p>;
  if (error) return <p className="text-center p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-linear-to-r from-green-50 via-blue-50 to-purple-50 rounded-2xl shadow-lg space-y-6">
      <div className="flex mt-4 items-center justify-between">
        <h1 className="text-3xl text-black font-extrabold text-linear bg-clip-text from-green-900 via-blue-500 to-purple-500 flex items-center gap-2">
          <ShoppingCart className="w-7 h-7 text-green-500" />
          Orders
        </h1>
        <CSVLink
          data={orders}
          filename="orders.csv"
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Download CSV
        </CSVLink>
        <div className="flex justify-end">
          <button
            onClick={handleRefresh}
            className={`flex items-center px-5 py-2.5 bg-white text-black font-medium text-sm rounded-lg shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${isRefreshing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Updating...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
        <OrderTable orders={orders} />
      </div>
    </div>
  );
}