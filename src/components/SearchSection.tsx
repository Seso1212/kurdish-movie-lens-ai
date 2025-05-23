
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (query: string) => Promise<void>;
  isSearching: boolean;
}

const SearchSection = ({ onSearch, isSearching }: SearchSectionProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim() === '') {
      toast({
        title: "Error",
        description: "Please describe a movie to search",
        variant: "destructive"
      });
      return;
    }
    
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <section className="max-w-4xl mx-auto mb-20 glow-border rounded-xl overflow-hidden crisp-shadow bg-dark-200">
      <div className="p-1 shimmer-effect"></div>
      <div className="p-8 relative">
        <div className="absolute -top-3 -right-3 bg-navy-700 text-blue-200 px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-md">
          <span>Beta</span>
          <div className="w-2 h-2 rounded-full bg-green-400 ml-2 animate-pulse"></div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
          <div className="flex-1">
            <label htmlFor="movieQuery" className="block text-sm font-medium text-blue-300 mb-2">Describe your movie</label>
            <div className="relative">
              <textarea 
                id="movieQuery" 
                rows={4} 
                className="w-full bg-dark-300/70 border border-dark-100 rounded-lg px-5 py-4 text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 resize-none glow-border transition-all duration-200"
                placeholder="Describe any movie with details (e.g. 'An animated Disney movie about a robot named Baymax' or 'A mafia movie with Al Pacino directed by Coppola')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSearching}
              ></textarea>
              <div className="absolute bottom-4 right-4 text-xs text-blue-400/50">
                <i className="fas fa-lightbulb mr-1"></i>
                <span>Pro Tip: Include character names, directors, or unique details</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSearching ? (
              <>
                <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin mr-1"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-1" />
                <span>Find Movie</span>
                <i className="fas fa-arrow-right ml-1 text-sm"></i>
              </>
            )}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center justify-center bg-dark-300/50 text-blue-300 border border-dark-100 rounded-full px-3 py-1">
            <i className="fas fa-database mr-1.5 text-blue-400/80"></i>
            <span>Kurdish subtitles database</span>
          </div>
          <div className="flex items-center justify-center bg-dark-300/50 text-blue-300 border border-dark-100 rounded-full px-3 py-1">
            <i className="fas fa-film mr-1.5 text-blue-400/80"></i>
            <span>IMDB data</span>
          </div>
          <div className="flex items-center justify-center bg-dark-300/50 text-blue-300 border border-dark-100 rounded-full px-3 py-1">
            <i className="fas fa-bolt mr-1.5 text-blue-400/80"></i>
            <span>AI-powered search</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
