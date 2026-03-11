import React, { useState, useEffect } from "react";
import { Sparkles, ChevronRight, Menu, X, Bell, User, Settings } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // const [dark, setDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10 border-b border-purple-500/20"
          : "bg-linear-to-r from-gray-950 via-purple-950 to-gray-950 border-b border-purple-500/10"
      }`}
    >
      {/* Animated Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              
              <div className="relative p-1 bg-linear-to-br from-purple-600 to-violet-700 rounded-full shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105">
               
                <img src="https://img.freepik.com/premium-vector/eco-friendly-icon-design-set-collection_607286-5780.jpg?semt=ais_hybrid&w=80&q=80" alt= "Logo" className="rounded-full"/>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-violet-300 transition-all duration-300">
                Rayeva AI Dashboard
              </h1>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="bg-linear-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent">
                  Full Stack / AI Intern Project
                </span>
              </div>
            </div>
          </div>
       

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {["Dashboard", "Analytics", "Settings"].map((item, index) => (
                <button
                  key={item}
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-purple-500 to-violet-500 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-purple-500/30" />

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-400 hover:text-purple-400 transition-colors duration-300 group">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                <span className="absolute inset-0 bg-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="relative p-2 text-gray-400 hover:text-purple-400 transition-colors duration-300 group">
                <Settings className="w-5 h-5" />
                <span className="absolute inset-0 bg-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 group">
                <User className="w-4 h-4" />
                <span>Profile</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative p-2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
            <span className="absolute inset-0 bg-purple-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 right-0 bg-gray-950/98 backdrop-blur-xl border-b border-purple-500/20 transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 space-y-2">
          {["Dashboard", "Analytics", "Settings"].map((item, index) => (
            <button
              key={item}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>{item}</span>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-500" />
            </button>
          ))}
          <button
  onClick={() => setDark(!dark)}
  className="p-2 bg-gray-600 text-white rounded hover:bg-gray-500"
>
  Toggle Dark Mode
</button>
          <div className="pt-4 border-t border-purple-500/20">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-linear-to-r from-purple-600 to-violet-600 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent" />
      
    </nav>
  );
}
