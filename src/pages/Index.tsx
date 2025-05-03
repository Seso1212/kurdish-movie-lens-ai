
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

// Common movie keywords for better search
const COMMON_MOVIE_KEYWORDS: Record<string, string[]> = {
  "big hero 6": ["baymax", "robot", "healthcare", "disney", "animated", "san fransokyo", "hiro"],
  "the dark knight": ["batman", "joker", "gotham", "nolan", "heath ledger"],
  "the godfather": ["mafia", "corleone", "coppola", "al pacino", "marlon brando", "sicily"],
  "spirited away": ["ghibli", "chihiro", "no face", "bathhouse", "miyazaki"],
  // Add more movies as needed
};

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

  const enhanceSearchQuery = (query: string): string => {
    const loweredQuery = query.toLowerCase();
    
    // Check if the query mentions Baymax or Big Hero 6 specifically
    if (loweredQuery.includes('baymax') || loweredQuery.includes('big hero')) {
      return "big hero 6";
    }
    
    // Check if the query mentions The Godfather or mafia movie with Marlon Brando/Al Pacino
    if (loweredQuery.includes('godfather') || 
        (loweredQuery.includes('mafia') && 
         (loweredQuery.includes('brando') || loweredQuery.includes('pacino') || loweredQuery.includes('coppola')))) {
      return "the godfather";
    }
    
    // Check if the query matches any of our predefined movie keywords
    for (const [movieTitle, keywords] of Object.entries(COMMON_MOVIE_KEYWORDS)) {
      // If the query contains multiple keywords for a specific movie, enhance with the movie title
      const matchedKeywords = keywords.filter(keyword => loweredQuery.includes(keyword.toLowerCase()));
      if (matchedKeywords.length >= 2) {
        console.log(`Enhanced search query with: ${movieTitle}`);
        return movieTitle;
      }
    }
    
    return query;
  };

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
    setImdbMovie(null);
    setKurdishMovie(null);
    
    try {
      const enhancedQuery = enhanceSearchQuery(query);
      console.log(`Original query: "${query}"`);
      console.log(`Enhanced query: "${enhancedQuery}"`);
      
      // Find IMDB match using the enhanced query
      const imdbResults = await searchIMDBMovies(enhancedQuery);
      const bestImdbMatch = imdbResults.length > 0 ? imdbResults[0] : null;
      
      // Log the results
      console.log('IMDB Match:', bestImdbMatch);
      
      if (bestImdbMatch) {
        setImdbMovie(bestImdbMatch);
        
        // If we have an IMDB match, check if we have Kurdish subtitles for it
        const kurdishMatch = findKurdishSubtitleByTitle(bestImdbMatch.l);
        setKurdishMovie(kurdishMatch);
        
        console.log('Kurdish Match:', kurdishMatch);
      } else {
        // If no IMDB match, try searching directly with the original query in the Kurdish database
        const directKurdishMatch = findKurdishSubtitleByTitle(query);
        setKurdishMovie(directKurdishMatch);
        console.log('Direct Kurdish Match:', directKurdishMatch);
      }
      
      setHasSearched(true);
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
