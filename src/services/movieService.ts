
import { Movie, KurdishSubtitle } from '@/types';

// Enhanced movie database with more details
export const movieDatabase: Movie[] = [
  {
    title: "Big Hero 6",
    year: "2014",
    director: "Don Hall, Chris Williams",
    description: "A special bond develops between plus-sized inflatable robot Baymax and prodigy Hiro Hamada, who team up with a group of friends to form a band of high-tech heroes. Set in the futuristic city of San Fransokyo, this Disney animation combines superhero action with heartfelt story about loss and friendship.",
    genre: ["Animation", "Action", "Adventure", "Comedy"],
    keywords: ["disney", "robot", "healthcare", "technology", "san fransokyo"],
    cast: ["Ryan Potter", "Scott Adsit", "Jamie Chung"],
    duration: "102 min",
    rating: "PG",
    score: 0,
    poster: "https://images.kurdsubtitle.net/file/kurdsubtitle/605115f98b9f2fb44bb47236_hightQuality.webp",
    backdrop: "https://image.tmdb.org/t/p/original/2BXd0t9JdVqCp9sKf6kzMkr7QjB.jpg"
  },
  {
    title: "Pakeezah",
    year: "1972",
    director: "Kamal Amrohi",
    description: "The story of a courtesan, Sahibjaan, who yearns for love and respect in early 20th century Lucknow. Known for its exquisite classical music and dance sequences, this Indian cinematic masterpiece explores themes of love, redemption, and societal norms through breathtaking visuals and poetic storytelling.",
    genre: ["Musical", "Drama", "Romance", "Classic"],
    keywords: ["bollywood", "classic", "dancer", "courtesan", "musical"],
    cast: ["Meena Kumari", "Raaj Kumar", "Ashok Kumar"],
    duration: "169 min",
    rating: "PG",
    score: 0,
    poster: "https://images.kurdsubtitle.net/file/kurdsubtitle/604fcb44ab8f5c87b415a3d6_hightQuality.webp",
    backdrop: "https://image.tmdb.org/t/p/original/A2OYYQvZhBkh3IR8sHhB0HpDnZq.jpg"
  },
  {
    title: "The Dark Knight",
    year: "2008",
    director: "Christopher Nolan",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. Heath Ledger's iconic performance as the Joker elevates this superhero film into a crime epic.",
    genre: ["Action", "Crime", "Drama", "Thriller"],
    keywords: ["batman", "joker", "gotham", "christopher nolan", "heath ledger"],
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    duration: "152 min",
    rating: "PG-13",
    score: 0,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/efl7X8o7oNYCY4RzurGRxdnNIuO.jpg"
  },
  {
    title: "Spirited Away",
    year: "2001",
    director: "Hayao Miyazaki",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts. This Studio Ghibli masterpiece blends Japanese folklore with stunning animation and profound themes of identity and courage.",
    genre: ["Animation", "Adventure", "Family", "Fantasy"],
    keywords: ["studio ghibli", "japanese", "spirits", "fantasy", "bathhouse"],
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    duration: "125 min",
    rating: "PG",
    score: 0,
    poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/Abuy6GXx9YtJCO1xvTgTpAXQMcU.jpg"
  }
];

// Kurdish subtitle database
export const kurdishSubtitleMovies: KurdishSubtitle[] = [
  {
    "Title": "Big Hero 6",
    "Year": "2014",
    "Genre": "ئەنیمەیشن",
    "Movie URL": "https://kurdsubtitle.net/movies/370945-Big-Hero-6",
    "Language": "English, Kurdish",
    "Poster URL": "https://images.kurdsubtitle.net/file/kurdsubtitle/605115f98b9f2fb44bb47236_hightQuality.webp",
    "Upload Date": "2021-03-08",
    "Quality": "1080p",
    "Subtitle Type": "SRT",
    "Size": "1.4GB"
  },
  {
    "Title": "Pakeezah",
    "Year": "1972",
    "Genre": "میوزیكاڵ",
    "Movie URL": "https://kurdsubtitle.net/movies/12293-Pakeezah",
    "Language": "Hindi, Kurdish",
    "Poster URL": "https://images.kurdsubtitle.net/file/kurdsubtitle/604fcb44ab8f5c87b415a3d6_hightQuality.webp",
    "Upload Date": "2021-03-11",
    "Quality": "720p",
    "Subtitle Type": "ASS",
    "Size": "850MB"
  }
];

// Enhanced matching algorithm
export function findMatchingMovies(query: string): Movie[] {
  // Pre-process query: remove stopwords, tokenize, stem
  const cleanedQuery = query.toLowerCase()
    .replace(/[^\w\s]|[\d]/g, '') // Remove punctuation and numbers
    .replace(/\b(the|a|an|and|or|but|about|with|from|for|at|in|on|to)\b/g, ''); // Remove common words
  
  const queryWords = cleanedQuery.split(/\s+/).filter(Boolean);
  
  // Score movies based on multiple factors
  const scoredMovies = movieDatabase.map(movie => {
    let score = 0;
    
    // 1. Title match (highest weight)
    const titleWords = movie.title.toLowerCase().split(/\s+/);
    queryWords.forEach(qWord => {
      titleWords.forEach(tWord => {
        if (tWord.includes(qWord)) {
          score += 8; // High score for title matches
        }
      });
    });
    
    // 2. Exact phrase match in description
    if (movie.description.toLowerCase().includes(query.toLowerCase())) {
      score += 6;
    }
    
    // 3. Individual word matches in description
    queryWords.forEach(word => {
      if (movie.description.toLowerCase().includes(word)) {
        score += 3;
      }
    });
    
    // 4. Genre matches
    movie.genre.forEach(genre => {
      queryWords.forEach(word => {
        if (genre.toLowerCase().includes(word)) {
          score += 4;
        }
      });
    });
    
    // 5. Keyword matches
    movie.keywords.forEach(keyword => {
      queryWords.forEach(word => {
        if (keyword.includes(word)) {
          score += 5;
        }
      });
    });
    
    // 6. Year match (exact)
    if (query.includes(movie.year)) {
      score += 10; // Very high score for exact year match
    }
    
    // 7. Director match
    const directors = movie.director.toLowerCase().split(',');
    directors.forEach(director => {
      queryWords.forEach(word => {
        if (director.trim().includes(word)) {
          score += 7;
        }
      });
    });
    
    // Normalize score to 0-10 for display
    const normalizedScore = Math.min(Math.round(score / 8), 10);
    
    return { ...movie, score: normalizedScore };
  });
  
  // Filter and sort by score
  return scoredMovies
    .filter(movie => movie.score >= 4) // Minimum threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, 6); // Limit to 6 best matches
}

// Check if movie has Kurdish subtitle
export function hasKurdishSubtitle(movieTitle: string): KurdishSubtitle | undefined {
  return kurdishSubtitleMovies.find(m => 
    m.Title.toLowerCase() === movieTitle.toLowerCase()
  );
}
