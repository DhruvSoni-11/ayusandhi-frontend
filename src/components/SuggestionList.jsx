import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

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
      <div className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-2 border-green-300 rounded-xl shadow-2xl mt-24 p-8 z-50">
        <div className="flex items-center justify-center">
          <Loader2 className="w-7 h-7 animate-spin text-green-600 mr-4" />
          <div className="text-center">
            <span className="text-green-800 font-semibold text-lg block">
              {searchTerm && searchTerm.match(/^[A-Z0-9-]+$/i)
                ? 'Looking up terminology code...'
                : 'Searching Ayurvedic terminology...'}
            </span>
            <span className="text-green-600 text-sm mt-1 block">
              Please wait while we search our comprehensive database
            </span>
          </div>
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
    <div className="absolute top-full left-0  right-0 bg-white/98 backdrop-blur-md border-2 border-green-300 rounded-xl shadow-2xl mt-24 max-h-80 overflow-y-auto z-50">
      <div className="p-3 border-b bg-gradient-to-r from-green-50 to-yellow-50 rounded-t-xl">
        <p className="text-sm text-green-800 font-semibold">
          {isDirectLookup
            ? '🎯 Direct code lookup result'
            : `🌿 Found ${suggestions.length} result${suggestions.length !== 1 ? 's' : ''}`}
        </p>
      </div>
      <ul ref={listRef} role="listbox" aria-label="Search suggestions">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.namaste_code || suggestion._id || index}
            role="option"
            aria-selected={index === selectedIndex}
            className={`px-6 py-4 cursor-pointer border-b border-green-100 last:border-b-0 hover:bg-green-50 transition-all duration-200 ${index === selectedIndex ? 'bg-green-100 border-green-300 shadow-md scale-[1.02]' : ''
              } ${isDirectLookup ? 'bg-blue-50 border-blue-200' : ''}`}
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
                <span className={`text-xs px-3 py-1 rounded-full font-mono border ${isDirectLookup
                  ? 'bg-blue-100 text-blue-800 border-blue-200 font-bold'
                  : 'bg-green-100 text-green-700 border-green-200'
                  }`}>
                  Code: {suggestion.namaste_code}
                </span>
                {suggestion.category && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full border border-yellow-200">
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

export default SuggestionList;