
import React from 'react';
import MovieCard from './MovieCard';
import { Movie, KurdishSubtitle } from '@/types';

interface ResultsSectionProps {
  movies: Movie[];
  kurdishSubtitleMovies: KurdishSubtitle[];
  totalResults: number;
  kurdishResults: number;
  stats: {
    matchRate: number;
    kurdishRate: number;
    avgConfidence: number;
  };
}

const ResultsSection = ({ movies, kurdishSubtitleMovies, totalResults, kurdishResults, stats }: ResultsSectionProps) => {
  const hasKurdishSubtitle = (movieTitle: string) => {
    return kurdishSubtitleMovies.find(m => 
      m.Title.toLowerCase() === movieTitle.toLowerCase()
    );
  };

  return (
    <section className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-dark-200 border border-dark-100 flex items-center justify-center mr-4 shadow-inner">
            <i className="fas fa-clipboard-check text-blue-400 text-xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
            <p className="text-blue-300/80 text-sm">
              {totalResults > 0 ? 
                `Found ${totalResults} potential matches (${kurdishResults} with Kurdish subtitles)` : 
                "No matches found"}
            </p>
          </div>
        </div>
        {kurdishResults > 0 && (
          <div className="flex items-center gap-2 bg-dark-200 border border-dark-100 rounded-full px-4 py-2 shadow-sm">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <div className="h-2 w-2 rounded-full bg-green-400 absolute top-0 left-0 animate-ping"></div>
            </div>
            <span className="text-sm font-medium text-green-300">Kurdish subtitles found</span>
          </div>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {movies.length === 0 ? (
          <div className="col-span-full bg-dark-200/50 rounded-xl border border-dark-100 p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-dark-100 border border-dark-100 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-times text-3xl text-red-400/80"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
            <p className="text-blue-300/80 mb-6 max-w-md mx-auto">We couldn't find any movies matching your description in our database.</p>
            <button className="bg-dark-100 hover:bg-dark-100/80 text-blue-300 hover:text-white px-5 py-2.5 rounded-lg transition-colors duration-200">
              <i className="fas fa-redo mr-2"></i>Try different keywords
            </button>
          </div>
        ) : (
          movies.map((movie, index) => (
            <MovieCard 
              key={index} 
              movie={movie} 
              kurdishSubInfo={hasKurdishSubtitle(movie.title)}
            />
          ))
        )}
      </div>

      {/* Stats Footer */}
      {movies.length > 0 && (
        <div className="mt-12 pt-6 border-t border-dark-100 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <div className="text-blue-300 text-sm mb-1">Database matched</div>
              <div className="text-2xl font-bold text-white">{stats.matchRate}%</div>
            </div>
            <div className="text-center">
              <div className="text-blue-300 text-sm mb-1">Kurdish available</div>
              <div className="text-2xl font-bold text-white">{stats.kurdishRate}%</div>
            </div>
            <div className="text-center">
              <div className="text-blue-300 text-sm mb-1">Confidence score</div>
              <div className="text-2xl font-bold text-white">{stats.avgConfidence}%</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultsSection;
