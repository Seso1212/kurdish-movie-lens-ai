
import React, { useState } from 'react';
import { Movie } from '@/types';
import { findMatchingMovies, kurdishSubtitleMovies, hasKurdishSubtitle } from '@/services/movieService';
import { Toaster } from "@/components/ui/toaster";

// Components
import Header from '@/components/Header';
import SearchSection from '@/components/SearchSection';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import ResultsSection from '@/components/ResultsSection';

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [stats, setStats] = useState({
    matchRate: 0,
    kurdishRate: 0,
    avgConfidence: 0
  });

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setHasSearched(false);
    
    // Simulate AI processing with a delay
    setTimeout(() => {
      // Find matching movies
      const movieResults = findMatchingMovies(query);
      setResults(movieResults);
      
      // Calculate statistics
      const totalResults = movieResults.length;
      const kurdishResults = movieResults.filter(movie => hasKurdishSubtitle(movie.title)).length;
      
      // Calculate match percentages
      const matchRate = totalResults > 0 ? Math.round((totalResults / 4) * 100) : 0;
      const kurdishRate = totalResults > 0 ? Math.round((kurdishResults / totalResults) * 100) : 0;
      const avgConfidence = totalResults > 0 ? 
        Math.round(movieResults.reduce((sum, movie) => sum + (movie.score / 10 * 100), 0) / totalResults) : 0;
      
      setStats({
        matchRate,
        kurdishRate,
        avgConfidence
      });
      
      setIsSearching(false);
      setHasSearched(true);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Toaster />
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      
      <Header />
      <SearchSection onSearch={handleSearch} />
      
      {isSearching && <LoadingState />}
      
      {!isSearching && !hasSearched && <EmptyState />}
      
      {!isSearching && hasSearched && (
        <ResultsSection 
          movies={results}
          kurdishSubtitleMovies={kurdishSubtitleMovies}
          totalResults={results.length}
          kurdishResults={results.filter(movie => hasKurdishSubtitle(movie.title)).length}
          stats={stats}
        />
      )}
    </div>
  );
};

export default Index;
