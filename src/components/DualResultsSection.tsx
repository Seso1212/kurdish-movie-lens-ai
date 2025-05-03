
import React from 'react';
import { KurdishSubtitle, IMDBMovie } from '@/types';
import MovieCard from './MovieCard';
import IMDBMovieCard from './IMDBMovieCard';

interface DualResultsSectionProps {
  kurdishMovie: KurdishSubtitle | null;
  imdbMovie: IMDBMovie | null;
}

const DualResultsSection = ({ kurdishMovie, imdbMovie }: DualResultsSectionProps) => {
  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-dark-200 border border-dark-100 flex items-center justify-center mr-4 shadow-inner">
            <i className="fas fa-clipboard-check text-blue-400 text-xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Search Results</h2>
            <p className="text-blue-300/80 text-sm">
              {kurdishMovie ? "Kurdish subtitle found!" : "No Kurdish subtitle found"} | 
              {imdbMovie ? " IMDB match found!" : " No IMDB match found"}
            </p>
          </div>
        </div>
        {kurdishMovie && (
          <div className="flex items-center gap-2 bg-dark-200 border border-dark-100 rounded-full px-4 py-2 shadow-sm">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <div className="h-2 w-2 rounded-full bg-green-400 absolute top-0 left-0 animate-ping"></div>
            </div>
            <span className="text-sm font-medium text-green-300">Kurdish subtitles available</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kurdish Subtitle Column */}
        <div>
          <h3 className="text-lg font-medium text-blue-300 mb-4">Kurdish Subtitle Match</h3>
          {kurdishMovie ? (
            <MovieCard
              movie={{
                title: kurdishMovie.Title,
                year: kurdishMovie.Year,
                director: "Unknown",
                description: `Genre: ${kurdishMovie.Genre}`,
                genre: [kurdishMovie.Genre],
                keywords: [],
                cast: [],
                duration: "Unknown",
                rating: "Unknown",
                score: 10,
                poster: kurdishMovie["Poster URL"]
              }}
              kurdishSubInfo={kurdishMovie}
            />
          ) : (
            <div className="bg-dark-200/50 rounded-xl border border-dark-100 p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-dark-100 border border-dark-100 flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-language text-2xl text-blue-400/50"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Kurdish Subtitles</h3>
              <p className="text-blue-300/80 max-w-md mx-auto">
                We couldn't find Kurdish subtitles for this movie in our database.
              </p>
            </div>
          )}
        </div>

        {/* IMDB Column */}
        <div>
          <h3 className="text-lg font-medium text-blue-300 mb-4">IMDB Match</h3>
          {imdbMovie ? (
            <IMDBMovieCard movie={imdbMovie} />
          ) : (
            <div className="bg-dark-200/50 rounded-xl border border-dark-100 p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-dark-100 border border-dark-100 flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-film text-2xl text-blue-400/50"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No IMDB Match</h3>
              <p className="text-blue-300/80 max-w-md mx-auto">
                We couldn't find a matching movie on IMDB. Try refining your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DualResultsSection;
