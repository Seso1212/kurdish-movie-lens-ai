
import { IMDBMovie } from "@/types";

export async function searchIMDBMovies(query: string): Promise<IMDBMovie[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
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
    return data || [];
  } catch (error) {
    console.error('Error fetching IMDB data:', error);
    return [];
  }
}

export function getIMDBLink(imdbId: string): string {
  return `https://www.imdb.com/title/${imdbId}`;
}
