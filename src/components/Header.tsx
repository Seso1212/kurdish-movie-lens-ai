
import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-16 relative overflow-hidden rounded-xl p-8 bg-dark-200 crisp-shadow glow-border">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-navy-700 via-navy-600 to-navy-500 text-white shadow-lg">
          <i className="fas fa-film text-3xl"></i>
        </div>
        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100 tracking-tight">Kurdish Movie Finder</h1>
        <h2 className="text-xl font-medium text-blue-200 mb-6">AI-Powered Subtitle Availability Search</h2>
        <div className="max-w-2xl mx-auto text-blue-300/90 leading-relaxed">
          <p>Our advanced AI analyzes your movie descriptions and instantly checks our comprehensive database of Kurdish subtitles. Find movies with professional Kurdish translations in seconds.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
