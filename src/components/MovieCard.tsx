
import React from 'react';
import { Movie, KurdishSubtitle } from '@/types';

interface MovieCardProps {
  movie: Movie;
  kurdishSubInfo: KurdishSubtitle | undefined;
}

const MovieCard = ({ movie, kurdishSubInfo }: MovieCardProps) => {
  const hasKurdishSub = !!kurdishSubInfo;
  
  const createStarRating = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score / 2); // Convert 0-10 scale to 0-5 stars
    
    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars ? 
        <i key={i} className="fas fa-star text-yellow-400"></i> : 
        <i key={i} className="far fa-star text-yellow-400/30"></i>
      );
    }
    return stars;
  };

  return (
    <div className="professional-card bg-dark-200/70 rounded-xl overflow-hidden border border-dark-100 crisp-shadow glow-border h-full">
      <div className="relative h-full flex flex-col">
        {/* Movie backdrop with title overlay */}
        <div className="h-36 bg-dark-100 relative overflow-hidden">
          <img 
            src={movie.poster || 'https://via.placeholder.com/500x750'} 
            alt={movie.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 gradient-mask"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white mb-1">{movie.title}</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-blue-300">{movie.year}</span>
              <span className="text-blue-300">•</span>
              <span className="text-blue-300">{movie.duration}</span>
              <span className="text-blue-300">•</span>
              <span className="bg-dark-100/80 text-blue-300 px-2 py-0.5 rounded">{movie.rating}</span>
              {movie.genre.slice(0, 2).map((g, index) => (
                <span key={index} className="bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded">{g}</span>
              ))}
            </div>
          </div>
          
          {/* Confidence badge */}
          <div className="absolute top-4 right-4 bg-dark-100/90 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-dark-100 flex items-center text-xs font-medium">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              movie.score >= 7 ? 'bg-green-400' : movie.score >= 4 ? 'bg-yellow-400' : 'bg-red-400'
            }`}></div>
            {movie.score}/10 match
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Director and stars */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h4 className="text-xs text-blue-300/80 uppercase tracking-wider mb-1">Director</h4>
              <p className="text-sm text-white">{movie.director}</p>
            </div>
            <div className="text-right">
              <h4 className="text-xs text-blue-300/80 uppercase tracking-wider mb-1">Match score</h4>
              <div className="text-yellow-400 text-sm flex justify-end">
                {createStarRating(movie.score)}
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-4 flex-1">
            <h4 className="text-xs text-blue-300/80 uppercase tracking-wider mb-1">Synopsis</h4>
            <p className="text-sm text-blue-100 leading-relaxed line-clamp-4">{movie.description}</p>
          </div>
          
          {/* Cast */}
          <div className="mb-6">
            <h4 className="text-xs text-blue-300/80 uppercase tracking-wider mb-1">Cast</h4>
            <div className="text-sm text-blue-100 truncate">
              {movie.cast.slice(0, 3).join(', ')}{movie.cast.length > 3 ? ' + more...' : ''}
            </div>
          </div>
          
          {/* Kurdish subtitle button or notice */}
          {hasKurdishSub ? (
            <div className="mt-auto">
              <div className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-4 py-3 rounded-lg transition-all duration-200 group">
                <a href={kurdishSubInfo['Movie URL']} target="_blank" className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fas fa-language text-lg mr-3"></i>
                    <div>
                      <div className="font-medium">Kurdish Subtitles Available</div>
                      <div className="text-xs text-green-100/90 mt-1 flex items-center">
                        <span className="inline-block mr-2">{kurdishSubInfo['Quality']} • {kurdishSubInfo['Subtitle Type']}</span>
                        <span className="inline-block bg-green-700/30 text-green-200 px-1.5 py-0.5 rounded">Verified</span>
                      </div>
                    </div>
                  </div>
                  <i className="fas fa-external-link-alt text-green-200/60 group-hover:text-white transition-colors"></i>
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-auto pt-4 border-t border-dark-100/50">
              <div className="flex items-center justify-center bg-dark-100/50 text-blue-300/70 px-4 py-2.5 rounded-lg">
                <i className="fas fa-language mr-2"></i>
                <span className="text-sm">No Kurdish subtitle found in our database</span>
              </div>
            </div>
          )}
        </div>
        
        {hasKurdishSub && (
          <div className="absolute -top-3 -left-3 bg-gradient-to-br from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center z-10">
            <i className="fas fa-check mr-1"></i> <span>Kurdish</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
