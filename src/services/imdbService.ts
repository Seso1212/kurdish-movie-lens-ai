
import { IMDBMovie } from "@/types";

export async function searchIMDBMovies(query: string): Promise<IMDBMovie[]> {
  try {
    // Clean the query for the API path - remove spaces and special chars
    const cleanQuery = query.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    const encodedQuery = encodeURIComponent(cleanQuery);
    
    const response = await fetch(`https://imdb-movies-web-series-etc-search.p.rapidapi.com/${encodedQuery}.json`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'e016f58175mshc2553859f668392p1acdeajsne3effaa4d6bb',
        'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch from IMDB API');
    }
    
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching IMDB data:', error);
    return [];
  }
}

export function getIMDBLink(imdbId: string): string {
  return `https://www.imdb.com/title/${imdbId}`;
}
