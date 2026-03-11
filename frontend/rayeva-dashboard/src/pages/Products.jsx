
import React, { useState, useEffect } from "react";
import ProductTable from "../components/ProductTable";
import { Box, RefreshCw } from "lucide-react";
import ProductCard from "../components/ProductCard";
import api from "../api/api";
import EditProductModal from "../components/EditProductModal";

import { CSVLink } from "react-csv";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table"); // toggle between table and card view
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // for modal

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      fetchProducts(); 
      setSearch("");
      setIsRefreshing(false);
    }, 1000);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    await api.delete(`/products/${id}`);
    fetchProducts();  // refresh list
  } catch (err) {
    console.error(err);
  }
};

  const handleSaveEdit = (updatedProduct) => {
  setProducts(prev =>
    prev.map(p =>
      p._id === updatedProduct._id ? updatedProduct : p
    )
  );
};

  return (
    <div className="p-6 bg-linear-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-2xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex mt-6 items-center justify-between">
        <h1 className="text-3xl font-extrabold bg-clip-text text-black bg-linear flex items-center gap-2">
          <Box className="w-7 h-7 text-purple-500" />
          Products
        </h1>
        <div className="flex items-center gap-4">
          <CSVLink
            data={products}
            filename="products.csv"
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Download CSV
          </CSVLink>
          <button
            onClick={() => setView(view === "table" ? "cards" : "table")}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {view === "table" ? "Card View" : "Table View"}
          </button>
          <button
            onClick={handleRefresh}
            className={`flex items-center px-5 py-2.5 bg-white text-black font-medium text-sm rounded-lg shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
              isRefreshing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-slate-600 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          />
        </div>
        {view === "cards" ? (
          <ProductCard />
        ) : (
          <ProductTable
            products={products}
            search={search}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}