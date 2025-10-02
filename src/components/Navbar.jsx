import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import MotionDiv from './MotionDiv';

const Navbar = ({ onSearchFocus, searchTerm, onSearchChange, onLogoClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b-4 border-orange-500 sticky top-0 z-50">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <MotionDiv
            onClick={onLogoClick}
            className="flex items-center space-x-3 cursor-pointer"
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="w-26 h-26 rounded-full flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="AyuSandhi Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            {/* text part of the logo */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-900 bg-clip-text text-transparent leading-none">
                AyuSandhi
              </h1>
              <p className="text-xs text-green-700 font-medium">Medical Terminology System</p>
            </div>
          </MotionDiv>

          {/* Search Bar - Desktop */}
          <MotionDiv
            className="hidden md:flex flex-1 max-w-2xl mx-8"
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={onSearchFocus}
                placeholder="Search medical terminology or enter NAMASTE code..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg text-lg focus:border-orange-500 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
                aria-label="Search medical terminology or lookup by code"
              />
            </div>
          </MotionDiv>

          {/* Navigation Links */}
          <MotionDiv
            className="hidden md:flex items-center space-x-6"
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.4 }}
          >
          </MotionDiv>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={onSearchFocus}
                placeholder="Search medical terminology or enter NAMASTE code..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-all bg-white"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium py-2">About</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium py-2">Documentation</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium py-2">API</a>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium text-left">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;