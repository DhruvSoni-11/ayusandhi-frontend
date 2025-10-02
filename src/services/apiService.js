const API_BASE_URL = 'https://ayusandhi-backend.vercel.app/api/v1/terminology';

export const apiService = {
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