import React, { useState, useEffect } from "react";
import ProductTable from "../components/ProductTable";
import OrderTable from "../components/OrderTable";
import ImpactChart from "../components/ImpactChart";
import SummaryCards from "../components/SummaryCard";
import AddProduct from "../components/AddProduct";
import api from "../api/api";
import { TrendingUp, RefreshCw, Box, ShoppingCart } from 'lucide-react';

export default function Dashboard() {

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

    // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
     
    <div className="p-6 space-y-8 bg-linear-to-r from-purple-50 via-blue-50 to-green-50 rounded-2xl shadow-lg">
  <div className="flex mt-4 items-center justify-between">
    <h1 className="text-4xl font-extrabold text-linear bg-clip-text text-transparent from-purple-600 via-pink-500 to-red-500">
      <span className="inline-flex items-center gap-2 text-black">
        <TrendingUp className="w-8 h-8 text-purple-500" />
        Dashboard
      </span>
    </h1>
    <div className="mt-8 flex justify-end">
              <button
                onClick={handleRefresh}
                className={`flex items-center px-5 py-2.5 bg-white text-black font-medium text-sm rounded-lg shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${isRefreshing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Updating...' : 'Refresh'}
              </button>
            </div>
  </div>
  <AddProduct onAdd={p => setProducts(prev => [...prev, p])} />

   <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
    <SummaryCards />
  </div>

  <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
    <ImpactChart />
  </div>

  <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl font-extrabold text-indigo-600 flex items-center gap-2">
        <Box className="w-6 h-6 text-indigo-500" />
        Products
      </h2>
    </div>
    <ProductTable products={products}        
  onEdit={(p) => alert(`Editing ${p.name}`)} 
  onDelete={(id) => setProducts(products.filter(p => p._id !== id))} />
  </div>

  <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl font-extrabold text-green-600 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6 text-green-500" />
        Orders
      </h2>
    </div>
    <OrderTable />
  </div>
</div>
  );
}