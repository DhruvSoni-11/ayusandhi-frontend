import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import { apiService } from './services/apiService';
import Navbar from './components/Navbar';
import useDebounce from './hooks/useDebounce';
import SuggestionList from './components/SuggestionList';
import HeroSection from './components/HeroSection';
import TerminologyCard from './components/TerminologyCard';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';
import SupportPage from './components/SupportPage';
import ScanReport from './components/ScanReport';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [selectedTerminology, setSelectedTerminology] = useState(null);
  const [currentView, setCurrentView] = useState('search'); // 'search', 'details', 'support', etc.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 350);

  // Navigation handler
  const navigateToPage = (page) => {
    setCurrentView(page);
    setSelectedTerminology(null);
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    setError(null);
  };

  // Search handler
  const handleSearch = useCallback(async (query) => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await apiService.enhancedSearch(query);
      const resultsArray = Array.isArray(results) ? results : [];
      setSuggestions(resultsArray);
      setShowSuggestions(resultsArray.length > 0);
      if (resultsArray.length > 0) setSelectedSuggestion(0);
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

  // Select suggestion
  const handleSuggestionSelect = async (suggestion) => {
    if (!suggestion.namaste_code) {
      setError('Invalid terminology selected. Missing NAMASTE code.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);

    try {
      if (suggestion.definition || suggestion.clinical_features || suggestion.icd11_mappings) {
        setSelectedTerminology(suggestion);
        setCurrentView('details');
      } else {
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

  // Keyboard navigation
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
      default:
        break;
    }
  }, [showSuggestions, suggestions, selectedSuggestion, handleSuggestionSelect]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackToSearch = () => {
    navigateToPage('search');
  };

  const handleSearchFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
      setSelectedSuggestion(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Navbar */}
      <Navbar
        onSearchFocus={handleSearchFocus}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onLogoClick={handleBackToSearch}
        onNavigate={navigateToPage}
      />

      {/* Main Content */}
      <div className="">
        {/* Suggestion Box */}
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

        {/* Views */}
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
        ) : currentView === 'support' ? (
          <SupportPage onNavigate={navigateToPage} />
        ) : currentView === 'scan-document' ? (
          <ScanReport />
        ) : currentView === 'details' && selectedTerminology ? (
          <TerminologyCard
            terminology={selectedTerminology}
            onBack={handleBackToSearch}
          />
        ) : null}
      </div>

      {/* Footer */}
      <Footer navigateToPage={navigateToPage} />
    </div>
  );
};

export default App;
