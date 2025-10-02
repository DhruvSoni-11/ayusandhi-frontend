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
            className={`px-6 py-4 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-orange-50 transition-colors ${index === selectedIndex ? 'bg-orange-100 border-orange-200' : ''
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
                <span className={`text-xs px-2 py-1 rounded font-mono ${isDirectLookup
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

export default SuggestionList;