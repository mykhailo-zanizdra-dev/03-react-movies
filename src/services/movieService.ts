import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieHttpResponse {
  results: Movie[];
}

const fetchMovies = async (query: string): Promise<Movie[]> => {
  const token = import.meta.env.VITE_TMDB_API_TOKEN;

  try {
    const response = await axios.get<MovieHttpResponse>(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          query: query,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default fetchMovies;
