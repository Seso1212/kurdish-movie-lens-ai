
import React, { useState, useEffect } from 'react';
import { KurdishSubtitle, IMDBMovie } from '@/types';
import { loadKurdishSubtitles, findKurdishSubtitleByTitle } from '@/services/movieService';
import { searchIMDBMovies } from '@/services/imdbService';
import { Toaster } from "@/components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import { toast } from '@/hooks/use-toast';

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Load Kurdish subtitles data on component mount
  const { isLoading, data: subtitleData } = useQuery({
    queryKey: ['kurdishSubtitles'],
    queryFn: loadKurdishSubtitles,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a movie description",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    setHasSearched(false);
    setSearchQuery(query);
    
    try {
      // In a real app, this would be a call to an AI/ML service
      // For now, we'll search IMDB directly with the user's query and take the first result
      
      // Find IMDB match first
      const imdbResults = await searchIMDBMovies(query);
      const bestImdbMatch = imdbResults.length > 0 ? imdbResults[0] : null;
      setImdbMovie(bestImdbMatch);
      
      // If we have an IMDB match, check if we have Kurdish subtitles for it
      let kurdishMatch = null;
      if (bestImdbMatch) {
        kurdishMatch = findKurdishSubtitleByTitle(bestImdbMatch.l);
      }
      
      setKurdishMovie(kurdishMatch);
      setHasSearched(true);
      
      // Log the results for debugging
      console.log('IMDB Match:', bestImdbMatch);
      console.log('Kurdish Match:', kurdishMatch);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "Failed to search for movies",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Toaster />
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      
      <Header />
      <SearchSection onSearch={handleSearch} isSearching={isSearching} />
      
      {(isSearching || isLoading) && <LoadingState />}
      
      {!isSearching && !isLoading && !hasSearched && <EmptyState />}
      
      {!isSearching && !isLoading && hasSearched && (
        <DualResultsSection 
          kurdishMovie={kurdishMovie}
          imdbMovie={imdbMovie}
        />
      )}
    </div>
  );
};

export default Index;
