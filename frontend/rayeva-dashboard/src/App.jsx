
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Conversations from "./pages/Conversations";

function App() {

  const [dark, setDark] = useState(true); 

  return (
    <div className={`${dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"} min-h-screen`}>
    <Router>
      <div className="flex min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
       <Layout></Layout>
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="p-6 space-y-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                    
                    <Dashboard />
        
                  </div>
                }
              />
              <Route
                path="/products"
                element={
                  <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
           
                    <Products />
         
                  </div>
                }
              />
              <Route
                path="/orders"
                element={
                  <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
             
                    <Orders />
                 
                  </div>
                }
              />
              <Route
                path="/conversations"
                element={
                  <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                 
                    <Conversations />
                
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;