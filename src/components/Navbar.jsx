import React, { useState } from 'react';
import { Search, Menu, X, Book, Code, Globe, FileText, ChevronDown, Leaf, Heart } from 'lucide-react';
import MotionDiv from './MotionDiv';
import ApiDocs from './ApiDocs';

const Navbar = ({ onSearchFocus, searchTerm, onSearchChange, onLogoClick, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showApiDocs, setShowApiDocs] = useState(false);
  const [apiDropdownOpen, setApiDropdownOpen] = useState(false);

  // Ayurvedic-themed logo placeholder
  const logoPlaceholderUrl = "./public/logo.png"; // Replace with actual logo path

  const navigationItems = [
    {
      label: 'Home',
      onClick: onLogoClick,
      icon: Heart
    },
    {
      label: 'API Documentation',
      hasDropdown: true,
      icon: Code,
      dropdownItems: [
        { label: 'API Overview', icon: Book, onClick: () => setShowApiDocs(true) },
        { label: 'Endpoints', icon: Code, onClick: () => setShowApiDocs(true) },
        { label: 'Authentication', icon: Globe, onClick: () => setShowApiDocs(true) },
        { label: 'Code Examples', icon: FileText, onClick: () => setShowApiDocs(true) }
      ]
    },
    {
      label: 'About Ayurveda',
      icon: Leaf,
      onClick: () => onNavigate && onNavigate('about-ayurveda')
    }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 pointer-events-none">
        <div className="backdrop-blur-md bg-gradient-to-r from-green-50/90 via-white/80 to-yellow-50/90 shadow-2xl px-6 py-4 flex items-center justify-between gap-6 rounded-3xl border border-green-200/50 w-[95%] sm:w-[85%] md:w-[75%] lg:w-[70%] pointer-events-auto">
          {/* Logo + Title */}
          <MotionDiv
            onClick={onLogoClick}
            className="flex items-center gap-3 cursor-pointer group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-yellow-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img
                src={logoPlaceholderUrl}
                alt="AyuSandhi Logo"
                className="relative h-10 w-10 object-contain drop-shadow-lg rounded-full border-2 border-white"
                onError={(e) => { e.target.onerror = null; e.target.src = logoPlaceholderUrl; }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-green-800 ayur-title group-hover:text-green-900 transition-colors">
                AyuSandhi
              </span>
              <span className="text-xs text-green-600 -mt-1 hidden sm:block">
                Traditional Wisdom
              </span>
            </div>
          </MotionDiv>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-900 font-medium transition-colors"
                      onMouseEnter={() => setApiDropdownOpen(true)}
                      onMouseLeave={() => setApiDropdownOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {apiDropdownOpen && (
                      <div
                        className="absolute top-full mt-0.4 left-0 bg-white rounded-xl shadow-xl border border-green-100 p-2 min-w-48 z-10"
                        onMouseEnter={() => setApiDropdownOpen(true)}
                        onMouseLeave={() => setApiDropdownOpen(false)}
                      >
                        {item.dropdownItems.map((dropItem, dropIndex) => (
                          <button
                            key={dropIndex}
                            onClick={dropItem.onClick}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-green-50 hover:text-green-800 rounded-lg transition-colors"
                          >
                            <dropItem.icon className="w-4 h-4 text-green-600" />
                            {dropItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-900 font-medium transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="flex-1 hidden md:flex justify-end gap-2 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={onSearchFocus}
                placeholder="Search Ayurvedic terminology..."
                className="w-full pl-12 pr-4 py-3 border-2 border-green-200 rounded-full text-sm focus:border-green-500 focus:outline-none transition-all bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md font-medium placeholder-green-400"
                aria-label="Search medical terminology or lookup by code"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-green-700 hover:text-green-900 transition-colors rounded-full hover:bg-green-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[95%] bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-green-200/50 mt-4 lg:hidden">
            {/* Mobile Search */}
            <div className="relative mb-6 px-2">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={onSearchFocus}
                placeholder="Search Ayurvedic terminology..."
                className="w-full pl-12 pr-4 py-3 border border-green-300 rounded-full text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition"

              />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-3">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setApiDropdownOpen(!apiDropdownOpen)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-green-700 hover:bg-green-50 rounded-lg transition-colors font-medium"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          {item.label}
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${apiDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {apiDropdownOpen && (
                        <div className="ml-4 space-y-1">
                          {item.dropdownItems.map((dropItem, dropIndex) => (
                            <button
                              key={dropIndex}
                              onClick={() => {
                                dropItem.onClick();
                                setIsMobileMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                            >
                              <dropItem.icon className="w-4 h-4" />
                              {dropItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        item.onClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-green-700 hover:bg-green-50 rounded-lg transition-colors font-medium"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* API Documentation Modal */}
      {showApiDocs && (
        <ApiDocs onClose={() => setShowApiDocs(false)} />
      )}
    </>
  );
};

export default Navbar;
