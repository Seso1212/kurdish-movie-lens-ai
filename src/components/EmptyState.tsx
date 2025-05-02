
import React from 'react';

const EmptyState = () => {
  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <div className="inline-block relative mb-8">
        <div className="w-24 h-24 rounded-full bg-dark-200 border border-dark-100 flex items-center justify-center shadow-inner">
          <i className="fas fa-film text-3xl text-blue-300 opacity-30"></i>
        </div>
      </div>
      <h3 className="text-2xl font-medium text-white/80 mb-3">Ready to search</h3>
      <p className="text-blue-300/60 mb-6">Describe any movie in the search box above to check for available Kurdish subtitles</p>
      
      <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
        <button className="text-xs bg-dark-200/50 hover:bg-dark-200 text-blue-300/80 hover:text-blue-200 px-3 py-1.5 rounded-full border border-dark-100 transition-colors">
          <i className="fas fa-history mr-2"></i>Latest added subtitles
        </button>
        <button className="text-xs bg-dark-200/50 hover:bg-dark-200 text-blue-300/80 hover:text-blue-200 px-3 py-1.5 rounded-full border border-dark-100 transition-colors">
          <i className="fas fa-trophy mr-2"></i>Popular with Kurds
        </button>
        <button className="text-xs bg-dark-200/50 hover:bg-dark-200 text-blue-300/80 hover:text-blue-200 px-3 py-1.5 rounded-full border border-dark-100 transition-colors">
          <i className="fas fa-child mr-2"></i>Family friendly
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
