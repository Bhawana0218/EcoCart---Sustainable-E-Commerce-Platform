
import { NavLink } from "react-router-dom";
import { Home, Box, ShoppingCart, MessageCircle } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-14 left-0 h-screen w-64 p-6 space-y-6 bg-gray-900 shadow-2xl rounded-r-xl z-50">
        <h2 className="text-2xl font-bold text-center text-purple-400">Menu</h2>
        <nav className="flex flex-col space-y-3 mt-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-gray-200 hover:text-white hover:bg-gray-800 ${
                isActive ? "bg-gray-700 font-semibold underline" : ""
              }`
            }
          >
            <Home size={18} className="text-blue-400" /> Dashboard
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-gray-200 hover:text-white hover:bg-gray-800 ${
                isActive ? "bg-gray-700 font-semibold underline" : ""
              }`
            }
          >
            <Box size={18} className="text-green-400" /> Products
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-gray-200 hover:text-white hover:bg-gray-800 ${
                isActive ? "bg-gray-700 font-semibold underline" : ""
              }`
            }
          >
            <ShoppingCart size={18} className="text-yellow-400" /> Orders
          </NavLink>

          <NavLink
            to="/conversations"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-gray-200 hover:text-white hover:bg-gray-800 ${
                isActive ? "bg-gray-700 font-semibold underline" : ""
              }`
            }
          >
            <MessageCircle size={18} className="text-pink-400" /> Conversations
          </NavLink>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64 p-6">
        {children}
      </div>
    </div>
  );
}