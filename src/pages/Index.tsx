
import React, { useState, useEffect } from 'react';
import { KurdishSubtitle, IMDBMovie } from '@/types';
import { loadKurdishSubtitles, findKurdishSubtitleByDescription } from '@/services/movieService';
import { searchIMDBMovies } from '@/services/imdbService';
import { Toaster } from "@/components/ui/toaster";

// Components
import Header from '@/components/Header';
import SearchSection from '@/components/SearchSection';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import DualResultsSection from '@/components/DualResultsSection';

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [kurdishMovie, setKurdishMovie] = useState<KurdishSubtitle | null>(null);
  const [imdbMovie, setImdbMovie] = useState<IMDBMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load Kurdish subtitles data on component mount
  useEffect(() => {
    const initData = async () => {
      await loadKurdishSubtitles();
      setIsLoading(false);
    };
    
    initData();
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setHasSearched(false);
    
    try {
      // Find Kurdish subtitle match
      const kurdishMatch = findKurdishSubtitleByDescription(query);
      setKurdishMovie(kurdishMatch);
      
      // Find IMDB match
      const imdbResults = await searchIMDBMovies(query);
      setImdbMovie(imdbResults.length > 0 ? imdbResults[0] : null);
      
      setHasSearched(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Toaster />
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      
      <Header />
      <SearchSection onSearch={handleSearch} isSearching={isSearching} />
      
      {isSearching && <LoadingState />}
      
      {!isSearching && !hasSearched && <EmptyState />}
      
      {!isSearching && hasSearched && (
        <DualResultsSection 
          kurdishMovie={kurdishMovie}
          imdbMovie={imdbMovie}
        />
      )}
    </div>
  );
};

export default Index;
