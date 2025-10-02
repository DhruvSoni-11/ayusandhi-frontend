import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import MotionDiv from './MotionDiv';

const Navbar = ({ onSearchFocus, searchTerm, onSearchChange, onLogoClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Placeholder for the logo URL, mirroring the requested style.
  const logoPlaceholderUrl = "https://placehold.co/36x36/10B981/ffffff?text=AY";

  return (
    // Outer container: Set to FIXED positioning at the very top (top-0) 
    // It spans the full width and uses pointer-events-none to allow clicks to pass through, 
    // except for the navigation bar itself.
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 pointer-events-none">
      <div
        // Inner container: This is the visible, styled, and interactive bar.
        // pointer-events-auto restores clickability only for the navigation content.
        className="backdrop-blur-md bg-white/20 shadow-xl
                   px-6 py-4 flex items-center justify-between gap-6
                   rounded-3xl border border-white/30
                   w-[90%] sm:w-[70%] md:w-[55%] pointer-events-auto"
      >
        {/* Logo + Title */}
        <MotionDiv
          onClick={onLogoClick}
          className="flex items-center gap-3 cursor-pointer"
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8 }}
        >
          {/* Logo Icon */}
          <img
            src="/logo.png" // Assuming this path exists or falls back to the placeholder
            alt="AyuSandhi Logo"
            className="h-9 w-9 object-contain drop-shadow-md rounded-full"
            onError={(e) => { e.target.onerror = null; e.target.src = logoPlaceholderUrl; }}
          />

          {/* Title Text */}
          <span className="font-bold text-xl text-green-800 transition">
            AyuSandhi
          </span>
        </MotionDiv>

        {/* Search Bar - Desktop (Wider, no 'Go' button) */}
        <div className="flex-1 hidden md:flex items-center justify-end gap-2 font-medium">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={onSearchFocus}
              placeholder="Search medical terminology or enter NAMASTE code..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:border-green-600 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
              aria-label="Search medical terminology or lookup by code"
            />
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu (also updated to match the floating style) */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[90%] bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/30 mt-4 md:hidden">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={onSearchFocus}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:border-green-600 focus:outline-none transition-all bg-white"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
