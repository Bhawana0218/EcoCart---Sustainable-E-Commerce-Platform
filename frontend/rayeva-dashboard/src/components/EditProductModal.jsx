

import React, { useState } from "react";
import api from "../api/api";

export default function EditProductModal({ product, onClose, onSave }) {
  const [name, setName] = useState(product.name);
  const [primaryCategory, setPrimaryCategory] = useState(product.aiClassification.primary_category);

  const handleSave = async () => {
  try {
    const updatedProduct = {
      name,
      aiClassification: {
        ...product.aiClassification,
        primary_category: primaryCategory
      }
    };

    // UPDATE existing product
    const res = await api.put(`/products/${product._id}`, updatedProduct);

    // Update parent state
    onSave(res.data);

    onClose();

  } catch (error) {
    console.error("Edit product failed:", error);
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-400 p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <div className="flex flex-col gap-3 mb-4">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <label>Primary Category</label>
          <input
            type="text"
            value={primaryCategory}
            onChange={e => setPrimaryCategory(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}