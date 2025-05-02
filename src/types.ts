
export interface Movie {
  title: string;
  year: string;
  director: string;
  description: string;
  genre: string[];
  keywords: string[];
  cast: string[];
  duration: string;
  rating: string;
  score: number;
  poster?: string;
  backdrop?: string;
}

export interface KurdishSubtitle {
  "Title": string;
  "Year": string;
  "Genre": string;
  "Movie URL": string;
  "Language": string;
  "Poster URL": string;
  "Upload Date": string;
  "Quality": string;
  "Subtitle Type": string;
  "Size": string;
}
