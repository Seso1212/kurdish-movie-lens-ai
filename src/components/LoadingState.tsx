
import React, { useEffect, useState } from 'react';

const LoadingState = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <div className="inline-block relative mb-8">
        <div className="w-24 h-24 rounded-full bg-dark-200 border-2 border-dark-100 flex items-center justify-center shadow-lg">
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-400 border-r-2 border-blue-400/30 animate-spin"></div>
          <i className="fas fa-film text-3xl text-blue-300"></i>
        </div>
      </div>
      <h3 className="text-2xl font-medium text-white mb-3">Analyzing your description</h3>
      <p className="text-blue-300/80 mb-6">Our AI engine is comparing your input against our movie database</p>
      
      <div className="max-w-md mx-auto">
        <div className="h-1.5 w-full bg-dark-100 rounded-full overflow-hidden mb-1">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-blue-400/60 flex justify-between">
          <span>Processing query</span>
          <span>{progress}%</span>
          <span>Checking subtitles</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
