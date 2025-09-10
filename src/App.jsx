import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ArrowLeft, Book, Globe, Heart, Clock, Tag, FileText, TreePine, AlertCircle, Loader2, Shield, Award, Menu, X } from 'lucide-react';

// Framer Motion simulation using CSS animations
const motionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const MotionDiv = ({ children, className, variants, initial, animate, exit, transition, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
    transition: `all ${transition?.duration || 0.6}s ease-out`
  };

  return (
    <div className={className} style={animationStyle} {...props}>
      {children}
    </div>
  );
};

// API Service
const API_BASE_URL = 'https://namaste-te4u.onrender.com/api/v1/terminology';

const apiService = {
  search: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results || data || [];
    } catch (error) {
      console.error('Search API error:', error);
      throw error;
    }
  },
  
  lookup: async (code) => {
    try {
      const response = await fetch(`${API_BASE_URL}/lookup/${encodeURIComponent(code)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Lookup API error:', error);
      throw error;
    }
  },

  // New enhanced search that combines search and lookup
  enhancedSearch: async (query) => {
    try {
      // First try regular search
      const searchResults = await apiService.search(query);
      
      // If no search results, try direct lookup by code
      if (!searchResults || searchResults.length === 0) {
        try {
          const lookupResult = await apiService.lookup(query);
          return lookupResult ? [lookupResult] : [];
        } catch (lookupError) {
          // If lookup also fails, return empty array
          return [];
        }
      }
      
      return searchResults;
    } catch (error) {
      console.error('Enhanced search API error:', error);
      throw error;
    }
  }
};

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Enhanced Navbar Component
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
              {/* green gradient circle behind the TreePine icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <TreePine className="w-7 h-7 text-white" />
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

// Enhanced Suggestion List Component
const SuggestionList = ({ suggestions, onSelect, selectedIndex, onKeyDown, isLoading, searchTerm }) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl mt-2 p-6 z-40">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500 mr-3" />
          <span className="text-gray-600 font-medium">
            {searchTerm && searchTerm.match(/^[A-Z0-9-]+$/i) 
              ? 'Looking up terminology code...' 
              : 'Searching terminology...'}
          </span>
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) return null;

  // Check if this looks like a direct lookup result
  const isDirectLookup = suggestions.length === 1 && searchTerm && 
                         searchTerm.match(/^[A-Z0-9-]+$/i) && 
                         suggestions[0].namaste_code === searchTerm.toUpperCase();

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl mt-2 max-h-96 overflow-y-auto z-40">
      <div className="p-3 border-b bg-gray-50 rounded-t-xl">
        <p className="text-sm text-gray-600 font-medium">
          {isDirectLookup 
            ? 'Direct code lookup result' 
            : `Found ${suggestions.length} result${suggestions.length !== 1 ? 's' : ''}`}
        </p>
      </div>
      <ul ref={listRef} role="listbox" aria-label="Search suggestions">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.namaste_code || suggestion._id || index}
            role="option"
            aria-selected={index === selectedIndex}
            className={`px-6 py-4 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-orange-50 transition-colors ${
              index === selectedIndex ? 'bg-orange-100 border-orange-200' : ''
            } ${isDirectLookup ? 'bg-blue-50' : ''}`}
            onClick={() => onSelect(suggestion)}
            onKeyDown={(e) => onKeyDown(e, index)}
            tabIndex={0}
          >
            <div className="font-semibold text-gray-900 mb-2 flex items-center">
              {suggestion.display_name || 'No display name'}
              {isDirectLookup && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-bold">
                  Code Match
                </span>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              {suggestion.english_name && (
                <div className="text-gray-700">
                  <span className="font-medium text-blue-600">English:</span> {suggestion.english_name}
                </div>
              )}
              {suggestion.hindi_name && (
                <div className="text-gray-700">
                  <span className="font-medium text-green-600">हिंदी:</span> {suggestion.hindi_name}
                </div>
              )}
            </div>
            {suggestion.namaste_code && (
              <div className="mt-2 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded font-mono ${
                  isDirectLookup 
                    ? 'bg-blue-100 text-blue-700 font-bold' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  Code: {suggestion.namaste_code}
                </span>
                {suggestion.category && (
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    {suggestion.category}
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Landing Page Hero Section
const HeroSection = () => (
  <div className="relative">
    {/* Background image */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-100"
      style={{ backgroundImage: "url('/ayurveda_image.png')" }}
    ></div>

    {/* Overlay (optional for better text readability) */}
    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/60"></div>

    {/* Content */}
    <div className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <MotionDiv
          className="mb-12"
          initial="initial"
          animate="animate"
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            The Best <span className="text-green-700">Ayurvedic & Medical Services</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            Trusted Healthcare Terminology Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Bridging traditional Ayurvedic wisdom with modern medical standards 
            through comprehensive terminology mapping and ICD-11 compliance.
          </p>
        </MotionDiv>

        <MotionDiv
          className="mt-10"
          initial="initial"
          animate="animate"
          transition={{ duration: 1, delay: 0.3 }}
        >
 
        </MotionDiv>
      </div>
    </div>
  </div>
);



// Statistics Section
const StatsSection = () => (
  <div className="bg-white py-16 border-t border-gray-100">
    <div className="max-w-6xl mx-auto px-4">
      <MotionDiv
        className="text-center mb-12"
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Comprehensive Medical Database</h2>
        <p className="text-gray-600 text-lg">Trusted by healthcare professionals across India</p>
      </MotionDiv>

      <MotionDiv
        className="grid md:grid-cols-4 gap-8"
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {[
          { number: "10,000+", label: "Medical Terms", color: "text-blue-600" },
          { number: "500+", label: "Ayurvedic Concepts", color: "text-green-600" },
          { number: "1,200+", label: "ICD-11 Mappings", color: "text-orange-600" },
          { number: "3", label: "Languages", color: "text-red-600" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </MotionDiv>
    </div>
  </div>
);

// Enhanced Terminology Card Component
const TerminologyCard = ({ terminology, onBack }) => {
  if (!terminology) return null;

  const InfoSection = ({ title, children, icon: Icon, bgColor = "bg-gray-50" }) => (
    <MotionDiv
      className="mb-8"
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-6 h-6 text-orange-600 mr-3" />}
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className={`${bgColor} rounded-lg p-5 border border-gray-200`}>
        {children}
      </div>
    </MotionDiv>
  );

  const formatArray = (arr) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return 'Not specified';
    return arr.join(', ');
  };

  const formatDoshaInvolvement = (dosha) => {
    if (!dosha) return 'Not specified';
    if (typeof dosha === 'string') return dosha;
    
    let result = '';
    if (dosha.primary) result += `Primary: ${dosha.primary}`;
    if (dosha.secondary && dosha.secondary.length > 0) {
      if (result) result += ', ';
      result += `Secondary: ${dosha.secondary.join(', ')}`;
    }
    return result || 'Not specified';
  };

  const formatICD11Mappings = (mappings) => {
    if (!mappings) return null;
    
    return (
      <div className="space-y-4">
        {mappings.tm2_code && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="font-bold text-blue-900 mb-2">TM2 Classification</div>
            <div className="text-sm space-y-1">
              <div><span className="font-medium">Code:</span> {mappings.tm2_code}</div>
              {mappings.tm2_display && <div><span className="font-medium">Display:</span> {mappings.tm2_display}</div>}
            </div>
          </div>
        )}
        {mappings.biomedicine_code && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="font-bold text-green-900 mb-2">Biomedicine Mapping</div>
            <div className="text-sm space-y-1">
              <div><span className="font-medium">Code:</span> {mappings.biomedicine_code}</div>
              {mappings.biomedicine_display && <div><span className="font-medium">Display:</span> {mappings.biomedicine_display}</div>}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-6xl mx-auto px-4">
        <MotionDiv
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={onBack}
            className="flex items-center text-orange-600 hover:text-orange-800 mb-8 transition-colors font-medium"
            aria-label="Back to search"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </button>

          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
            <div className="mb-10 border-b pb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {terminology.display_name || 'No display name available'}
                  </h1>
                  <div className="grid md:grid-cols-3 gap-6">
                    {terminology.english_name && (
                      <div>
                        <span className="font-semibold text-blue-600 block mb-1">English Name:</span>
                        <p className="text-gray-900 text-lg">{terminology.english_name}</p>
                      </div>
                    )}
                    {terminology.hindi_name && (
                      <div>
                        <span className="font-semibold text-green-600 block mb-1">हिंदी नाम:</span>
                        <p className="text-gray-900 text-lg">{terminology.hindi_name}</p>
                      </div>
                    )}
                    {terminology.namaste_code && (
                      <div>
                        <span className="font-semibold text-orange-600 block mb-1">NAMASTE Code:</span>
                        <p className="text-gray-900 font-mono text-lg bg-gray-100 px-3 py-2 rounded">{terminology.namaste_code}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-8">
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-center">
                    <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-orange-800">Government</p>
                    <p className="text-sm text-orange-700">Verified</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid xl:grid-cols-2 gap-10">
              <div className="space-y-8">
                <InfoSection title="Medical Classification" icon={Tag} bgColor="bg-orange-50">
                  <div className="space-y-3">
                    {terminology.medical_system && (
                      <p className="flex justify-between"><span className="font-semibold">Medical System:</span> <span>{terminology.medical_system}</span></p>
                    )}
                    {terminology.category && (
                      <p className="flex justify-between"><span className="font-semibold">Category:</span> <span>{terminology.category}</span></p>
                    )}
                    {terminology.subcategory && (
                      <p className="flex justify-between"><span className="font-semibold">Subcategory:</span> <span>{terminology.subcategory}</span></p>
                    )}
                  </div>
                </InfoSection>

                {terminology.definition && (
                  <InfoSection title="Clinical Definition" icon={FileText} bgColor="bg-blue-50">
                    <p className="leading-relaxed text-gray-800 text-lg">{terminology.definition}</p>
                  </InfoSection>
                )}

                {terminology.synonyms && terminology.synonyms.length > 0 && (
                  <InfoSection title="Alternative Names" icon={Book} bgColor="bg-green-50">
                    <div className="flex flex-wrap gap-2">
                      {terminology.synonyms.map((synonym, index) => (
                        <span key={index} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </InfoSection>
                )}
              </div>

              <div className="space-y-8">
                {terminology.clinical_features && terminology.clinical_features.length > 0 && (
                  <InfoSection title="Clinical Features" icon={Heart} bgColor="bg-red-50">
                    <ul className="space-y-3">
                      {terminology.clinical_features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          <span className="text-gray-800 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </InfoSection>
                )}

                {terminology.traditional_symptoms && terminology.traditional_symptoms.length > 0 && (
                  <InfoSection title="Traditional Symptoms" icon={TreePine} bgColor="bg-emerald-50">
                    <ul className="space-y-3">
                      {terminology.traditional_symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-3 h-3 bg-emerald-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          <span className="text-gray-800 font-medium">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </InfoSection>
                )}

                {terminology.dosha_involvement && (
                  <InfoSection title="Ayurvedic Analysis" icon={Globe} bgColor="bg-purple-50">
                    <div className="text-gray-800 font-medium text-lg">
                      {formatDoshaInvolvement(terminology.dosha_involvement)}
                    </div>
                  </InfoSection>
                )}
              </div>
            </div>

            {terminology.icd11_mappings && (
              <div className="mt-10 pt-8 border-t border-gray-200">
                <InfoSection title="International Classification (ICD-11)" icon={Globe} bgColor="bg-indigo-50">
                  {formatICD11Mappings(terminology.icd11_mappings)}
                </InfoSection>
              </div>
            )}

            {terminology.who_international_terminology && (
              <div className="mt-8">
                <InfoSection title="WHO International Terminology" icon={Award} bgColor="bg-yellow-50">
                  <div className="space-y-3">
                    {terminology.who_international_terminology.code && (
                      <p className="font-mono text-sm bg-white p-3 rounded border">
                        <span className="font-semibold">Code:</span> {terminology.who_international_terminology.code}
                      </p>
                    )}
                    {terminology.who_international_terminology.display && (
                      <p className="font-medium text-lg">{terminology.who_international_terminology.display}</p>
                    )}
                    {terminology.who_international_terminology.definition && (
                      <p className="text-gray-700">{terminology.who_international_terminology.definition}</p>
                    )}
                  </div>
                </InfoSection>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">Last Updated: {terminology.last_updated ? new Date(terminology.last_updated).toLocaleDateString() : 'Not specified'}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  terminology.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {terminology.status === 'active' ? '✓ Active' : terminology.status || 'Unknown'}
                </span>
                <div className="flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-bold">Government Verified</span>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [selectedTerminology, setSelectedTerminology] = useState(null);
  const [currentView, setCurrentView] = useState('search');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 350);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use the enhanced search that includes lookup functionality
      const results = await apiService.enhancedSearch(query);
      const resultsArray = Array.isArray(results) ? results : [];
      setSuggestions(resultsArray);
      setShowSuggestions(resultsArray.length > 0);
      
      if (resultsArray.length > 0) {
        setSelectedSuggestion(0);
      }
    } catch (err) {
      console.error('Enhanced search error:', err);
      setError('Unable to connect to the terminology database. Please check your internet connection and try again.');
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }
  }, [debouncedSearchTerm, handleSearch]);

  const handleSuggestionSelect = async (suggestion) => {
    if (!suggestion.namaste_code) {
      setError('Invalid terminology selected. Missing NAMASTE code.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);

    try {
      // If the suggestion already has full details (from direct lookup), use it directly
      if (suggestion.definition || suggestion.clinical_features || suggestion.icd11_mappings) {
        setSelectedTerminology(suggestion);
        setCurrentView('details');
      } else {
        // Otherwise, fetch full details
        const details = await apiService.lookup(suggestion.namaste_code);
        setSelectedTerminology(details);
        setCurrentView('details');
      }
    } catch (err) {
      console.error('Lookup error:', err);
      setError('Failed to load terminology details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
          handleSuggestionSelect(suggestions[selectedSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  }, [showSuggestions, suggestions, selectedSuggestion, handleSuggestionSelect]);

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedTerminology(null);
    setSelectedSuggestion(-1);
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleSearchFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
      setSelectedSuggestion(0);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
    <Navbar 
      onSearchFocus={handleSearchFocus}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onLogoClick={handleBackToSearch}
    />

    {/* ✅ Always show suggestions under the Navbar */}
    <div className="max-w-2xl mx-auto px-4 relative">
      {(showSuggestions || isLoading) && (
        <SuggestionList
          suggestions={suggestions}
          onSelect={handleSuggestionSelect}
          selectedIndex={selectedSuggestion}
          onKeyDown={handleKeyDown}
          isLoading={isLoading}
          searchTerm={searchTerm}
        />
      )}
    </div>

    {currentView === 'search' ? (
      <>
        {error && (
          <div className="max-w-4xl mx-auto px-4 mt-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center">
                <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Connection Error</h3>
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!searchTerm && !error && (
          <>
            <HeroSection />
            <StatsSection />
          </>
        )}
      </>
    ) : (
      <TerminologyCard
        terminology={selectedTerminology}
        onBack={handleBackToSearch}
      />
    )}

    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500 mb-2">
            © {new Date().getFullYear()} Ministry of AYUSH — National Digital Health Mission
          </p>
          <p className="text-sm text-gray-400">
            Empowering healthcare through traditional wisdom and modern technology
          </p>
        </div>
      </div>
    </footer>
  </div>
);
};

export default App;