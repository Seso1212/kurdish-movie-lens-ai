
import React from "react";
import { IMDBMovie } from "@/types";
import { getIMDBLink } from "@/services/imdbService";
import { ExternalLink, Star } from "lucide-react";

interface IMDBMovieCardProps {
  movie: IMDBMovie;
}

const IMDBMovieCard = ({ movie }: IMDBMovieCardProps) => {
  return (
    <div className="bg-dark-200/70 rounded-xl overflow-hidden border border-dark-100 crisp-shadow glow-border h-full">
      <div className="relative h-full flex flex-col">
        {/* Movie poster */}
        <div className="h-60 bg-dark-100 relative overflow-hidden">
          <img
            src={movie.imageUrl}
            alt={movie.l}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-1">{movie.l}</h3>
          
          <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
            <span className="text-blue-300">{movie.y}</span>
            {movie.rank && movie.rank <= 250 && (
              <div className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded flex items-center">
                <Star className="w-3 h-3 mr-1" />
                <span>Top {movie.rank} on IMDB</span>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <h4 className="text-xs text-blue-300/80 uppercase tracking-wider mb-1">Cast</h4>
            <p className="text-sm text-blue-100">{movie.s}</p>
          </div>
          
          <div className="mt-auto pt-4">
            <a 
              href={getIMDBLink(movie.id)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              View on IMDB <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IMDBMovieCard;
