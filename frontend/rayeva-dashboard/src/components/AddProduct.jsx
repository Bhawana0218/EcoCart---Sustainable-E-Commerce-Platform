

import React, { useState } from "react";
import api from "../api/api";

export default function AddProduct({ onAdd }) {
  const [name, setName] = useState("");
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [filters, setFilters] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const safeName = name.trim() || "Unnamed Product";
  const safePrimaryCategory = primaryCategory.trim() || "Uncategorized";
  const safeSubCategory = subCategory.trim() || "General";
  const safeFilters = filters
    ? filters.split(",").map((f) => f.trim())
    : [];

  try {
    const res = await api.post("/products", {
      // **Flat key-value structure**
      name: safeName,
      primary_category: safePrimaryCategory,
      sub_category: safeSubCategory,
      sustainability_filters: safeFilters,
    });

    onAdd(res.data);
    setName("");
    setPrimaryCategory("");
    setSubCategory("");
    setFilters("");
  } catch (err) {
    console.error("Add product failed:", err.response?.data || err.message);
    setError(
      err.response?.data?.error ||
        "Something went wrong. Please check your input."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4 text-gray-100"
    >
      <h2 className="text-xl font-bold text-indigo-400">Add New Product</h2>

      {error && (
        <div className="bg-red-600 text-white px-3 py-2 rounded">
          {error}
        </div>
      )}

      <input
        className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-indigo-400"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-indigo-400"
        placeholder="Primary Category"
        value={primaryCategory}
        onChange={(e) => setPrimaryCategory(e.target.value)}
        required
      />
      <input
        className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-indigo-400"
        placeholder="Sub Category"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
      />
      <input
        className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-indigo-400"
        placeholder="Filters (comma separated)"
        value={filters}
        onChange={(e) => setFilters(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 rounded text-white font-bold ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
        } transition-all duration-200`}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}