import React, { useEffect, useState } from "react";
import api from "../api/api";
import { ShoppingCart } from "lucide-react";

export default function ProductCard() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products
  useEffect(() => {

    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));

  }, []);

  // Place order
  const placeOrder = async (product) => {

    try {

      await api.post("/orders", {
        productId: product._id,
        productName: product.name,
        aiClassification: product.aiClassification
      });

      alert(`Order placed for ${product.name}!`);

    } catch (err) {

      console.error(err);
      alert("Failed to place order.");

    }

  };

  if (loading)
    return <p className="text-center text-gray-300 mt-8">Loading products...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-8">Error: {error}</p>;

  return (

    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

      {products.map((product) => (

        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 flex flex-col"
        >

          {/* Product Image */}
          <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">

            <img
              src={product.image || "https://www.druidebio.fr/img/cms/BLOG/Pourquoi-choisir-des-produits-ecologiques-durables-pour-l-hygiene-corporelle.jpg" }
              alt={product.name}
              className="object-cover h-full w-full hover:scale-110 transition duration-300"
            />

          </div>

          {/* Card Content */}
          <div className="p-4 flex flex-col wrap-flex-grow">

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500 mb-1">
              Category: {product.aiClassification?.primary_category}
            </p>

            <p className="text-sm text-gray-500 mb-3">
              Sub: {product.aiClassification?.sub_category}
            </p>

            {/* Sustainability Filters */}
            {product.aiClassification?.sustainability_filters?.length > 0 && (

              <div className="flex flex-wrap gap-1 mb-4">

                {product.aiClassification.sustainability_filters.map((f, i) => (

                  <span
                    key={i}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                  >
                    {f}
                  </span>

                ))}

              </div>

            )}

            {/* Order Button */}
            <button
              onClick={() => placeOrder(product)}
              className="mt-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
            >

              <ShoppingCart size={18} />
              Order Now

            </button>

          </div>

        </div>

      ))}

    </div>

  );
}