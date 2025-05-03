
import React, { useState } from 'react';
import { KurdishSubtitle, IMDBMovie } from '@/types';
import { findKurdishSubtitleByTitle } from '@/services/movieService';
import { searchIMDBMovies } from '@/services/imdbService';
import { processMovieDescription } from '@/services/deepseekService';
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
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  
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
    setAiSuggestion("");
    
    try {
      // First process the query through Deepseek AI
      const aiResult = await processMovieDescription(query);
      console.log("Deepseek AI result:", aiResult);
      
      // Store the AI suggested title
      setAiSuggestion(aiResult.title);
      
      // Use the AI suggested title to search IMDB
      console.log(`Using AI suggested title for search: "${aiResult.title}"`);
      const imdbResults = await searchIMDBMovies(aiResult.title);
      const bestImdbMatch = imdbResults.length > 0 ? imdbResults[0] : null;
      
      console.log('IMDB Match:', bestImdbMatch);
      
      if (bestImdbMatch) {
        setImdbMovie(bestImdbMatch);
        
        // Try to find Kurdish subtitles based on the IMDB match
        const kurdishMatch = findKurdishSubtitleByTitle(bestImdbMatch.l);
        setKurdishMovie(kurdishMatch);
        
        console.log('Kurdish Match:', kurdishMatch);
      } else {
        // If no IMDB match, try searching directly with the AI title in the Kurdish database
        const directKurdishMatch = findKurdishSubtitleByTitle(aiResult.title);
        setKurdishMovie(directKurdishMatch);
        console.log('Direct Kurdish Match:', directKurdishMatch);
      }
      
      setHasSearched(true);
      
      if (!bestImdbMatch && !kurdishMovie) {
        toast({
          title: "No matches found",
          description: `AI suggested "${aiResult.title}" but no movies were found.`,
          variant: "destructive"
        });
      }
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
      
      {isSearching && <LoadingState />}
      
      {!isSearching && !hasSearched && <EmptyState />}
      
      {!isSearching && hasSearched && (
        <DualResultsSection 
          kurdishMovie={kurdishMovie}
          imdbMovie={imdbMovie}
          aiSuggestion={aiSuggestion}
        />
      )}
    </div>
  );
};

export default Index;
