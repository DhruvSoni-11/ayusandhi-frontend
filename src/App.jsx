import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ArrowLeft, Book, Globe, Heart, Clock, Tag, FileText, TreePine, AlertCircle, Loader2 } from 'lucide-react';

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
      // Handle both flat array and nested object responses
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

// Search Bar Component
const SearchBar = ({ value, onChange, onFocus, placeholder = "Search medical terminology..." }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:outline-none transition-colors bg-white shadow-sm"
          aria-label="Search medical terminology"
        />
      </div>
    </div>
  );
};

// Suggestion List Component
const SuggestionList = ({ suggestions, onSelect, selectedIndex, onKeyDown, isLoading }) => {
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
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 p-4 z-50">
        <div className="flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-blue-500 mr-2" />
          <span className="text-gray-600">Searching...</span>
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
      <ul ref={listRef} role="listbox" aria-label="Search suggestions">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.namaste_code || suggestion._id || index}
            role="option"
            aria-selected={index === selectedIndex}
            className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
              index === selectedIndex ? 'bg-blue-50 border-blue-200' : ''
            }`}
            onClick={() => onSelect(suggestion)}
            onKeyDown={(e) => onKeyDown(e, index)}
            tabIndex={0}
          >
            <div className="font-medium text-gray-900 mb-1">
              {suggestion.display_name || 'No display name'}
            </div>
            {suggestion.english_name && (
              <div className="text-sm text-gray-600 mb-1">
                English: {suggestion.english_name}
              </div>
            )}
            {suggestion.hindi_name && (
              <div className="text-sm text-gray-600 mb-1">
                Hindi: {suggestion.hindi_name}
              </div>
            )}
            {suggestion.namaste_code && (
              <div className="text-xs text-gray-500">
                Code: {suggestion.namaste_code}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Terminology Card Component
const TerminologyCard = ({ terminology, onBack }) => {
  if (!terminology) return null;

  const InfoSection = ({ title, children, icon: Icon }) => (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        {Icon && <Icon className="w-5 h-5 text-blue-600 mr-2" />}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-700">{children}</div>
    </div>
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
      <div className="space-y-2">
        {mappings.tm2_code && (
          <div className="bg-gray-50 rounded p-3">
            <div className="font-medium">TM2 Mapping:</div>
            <div className="text-sm">Code: {mappings.tm2_code}</div>
            {mappings.tm2_display && <div className="text-sm">Display: {mappings.tm2_display}</div>}
          </div>
        )}
        {mappings.biomedicine_code && (
          <div className="bg-gray-50 rounded p-3">
            <div className="font-medium">Biomedicine Mapping:</div>
            <div className="text-sm">Code: {mappings.biomedicine_code}</div>
            {mappings.biomedicine_display && <div className="text-sm">Display: {mappings.biomedicine_display}</div>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        aria-label="Back to search"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Search
      </button>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {terminology.display_name || 'No display name available'}
          </h1>
          <div className="grid md:grid-cols-2 gap-4">
            {terminology.english_name && (
              <div>
                <span className="font-medium text-gray-600">English Name:</span>
                <p className="text-gray-900">{terminology.english_name}</p>
              </div>
            )}
            {terminology.hindi_name && (
              <div>
                <span className="font-medium text-gray-600">Hindi Name:</span>
                <p className="text-gray-900">{terminology.hindi_name}</p>
              </div>
            )}
            {terminology.namaste_code && (
              <div>
                <span className="font-medium text-gray-600">NAMASTE Code:</span>
                <p className="text-gray-900 font-mono">{terminology.namaste_code}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <InfoSection title="Classification" icon={Tag}>
              <div className="space-y-2">
                {terminology.medical_system && (
                  <p><span className="font-medium">Medical System:</span> {terminology.medical_system}</p>
                )}
                {terminology.category && (
                  <p><span className="font-medium">Category:</span> {terminology.category}</p>
                )}
                {terminology.subcategory && (
                  <p><span className="font-medium">Subcategory:</span> {terminology.subcategory}</p>
                )}
              </div>
            </InfoSection>

            {terminology.definition && (
              <InfoSection title="Definition" icon={FileText}>
                <p className="leading-relaxed">{terminology.definition}</p>
              </InfoSection>
            )}

            {terminology.synonyms && terminology.synonyms.length > 0 && (
              <InfoSection title="Synonyms" icon={Book}>
                <p>{formatArray(terminology.synonyms)}</p>
              </InfoSection>
            )}
          </div>

          <div>
            {terminology.clinical_features && terminology.clinical_features.length > 0 && (
              <InfoSection title="Clinical Features" icon={Heart}>
                <ul className="space-y-1">
                  {terminology.clinical_features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </InfoSection>
            )}

            {terminology.traditional_symptoms && terminology.traditional_symptoms.length > 0 && (
              <InfoSection title="Traditional Symptoms" icon={TreePine}>
                <ul className="space-y-1">
                  {terminology.traditional_symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </InfoSection>
            )}

            {terminology.severity_levels && terminology.severity_levels.length > 0 && (
              <InfoSection title="Severity Levels" icon={AlertCircle}>
                <p>{formatArray(terminology.severity_levels)}</p>
              </InfoSection>
            )}

            {terminology.dosha_involvement && (
              <InfoSection title="Dosha Involvement" icon={Globe}>
                <p>{formatDoshaInvolvement(terminology.dosha_involvement)}</p>
              </InfoSection>
            )}
          </div>
        </div>

        {terminology.icd11_mappings && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <InfoSection title="ICD-11 Mappings" icon={Globe}>
              {formatICD11Mappings(terminology.icd11_mappings)}
            </InfoSection>
          </div>
        )}

        {terminology.who_international_terminology && (
          <div className="mt-6">
            <InfoSection title="WHO International Terminology" icon={Globe}>
              <div className="bg-blue-50 rounded-lg p-4">
                {terminology.who_international_terminology.code && (
                  <p className="font-mono text-sm mb-2">Code: {terminology.who_international_terminology.code}</p>
                )}
                {terminology.who_international_terminology.display && (
                  <p className="font-medium mb-2">Display: {terminology.who_international_terminology.display}</p>
                )}
                {terminology.who_international_terminology.definition && (
                  <p className="text-sm">Definition: {terminology.who_international_terminology.definition}</p>
                )}
              </div>
            </InfoSection>
          </div>
        )}

        {terminology.hierarchy && (
          <div className="mt-6">
            <InfoSection title="Hierarchy" icon={TreePine}>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(terminology.hierarchy, null, 2)}</pre>
              </div>
            </InfoSection>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Last Updated: {terminology.last_updated ? new Date(terminology.last_updated).toLocaleDateString() : 'Not specified'}
          </div>
          <div className="flex items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              terminology.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {terminology.status || 'Unknown'}
            </span>
          </div>
        </div>
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
      console.log('Searching for:', query);
      const results = await apiService.search(query);
      console.log('Search results:', results);
      
      // Ensure we have an array
      const resultsArray = Array.isArray(results) ? results : [];
      setSuggestions(resultsArray);
      setShowSuggestions(resultsArray.length > 0);
      
      if (resultsArray.length > 0) {
        setSelectedSuggestion(0);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search terminology. Please check your connection and try again.');
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
      console.log('Looking up:', suggestion.namaste_code);
      const details = await apiService.lookup(suggestion.namaste_code);
      console.log('Lookup result:', details);
      setSelectedTerminology(details);
      setCurrentView('details');
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
  };

  const handleSearchFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
      setSelectedSuggestion(0);
    }
  };

  // Attach keydown listener to document
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            NAMASTE Terminology System
          </h1>
          <p className="text-gray-600 text-center mt-2">
            National Ayurveda Medical Standardized Terminology Ecosystem
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'search' ? (
          <div className="space-y-6">
            <div className="relative">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onFocus={handleSearchFocus}
              />
              {(showSuggestions || isLoading) && (
                <SuggestionList
                  suggestions={suggestions}
                  onSelect={handleSuggestionSelect}
                  selectedIndex={selectedSuggestion}
                  onKeyDown={handleKeyDown}
                  isLoading={isLoading}
                />
              )}
            </div>

            {error && (
              <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            {!searchTerm && !error && (
              <div className="text-center py-12">
                <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-600 mb-2">
                  Search Medical Terminology
                </h2>
                <p className="text-gray-500 mb-4">
                  Enter a term to search the NAMASTE terminology database
                </p>
                <p className="text-sm text-gray-400">
                  Try searching for terms like "fever", "diabetes", or "headache"
                </p>
              </div>
            )}

            {searchTerm && !isLoading && suggestions.length === 0 && !error && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or check the spelling
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600">Loading terminology details...</p>
              </div>
            ) : (
              <TerminologyCard
                terminology={selectedTerminology}
                onBack={handleBackToSearch}
              />
            )}
          </div>
        )}
      </main>

      <footer className="mt-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            NAMASTE Terminology System - Government of India Initiative
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;