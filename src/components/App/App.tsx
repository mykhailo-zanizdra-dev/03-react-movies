import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import fetchMovies from '../../services/movieService';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const fetchedMovies = await fetchMovies(query);
      setMovies(fetchedMovies);
      if (!fetchedMovies.length) {
        toast.error('No movies found for your request');
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'There was an error fetching movies'
      );
      setIsError(true);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className={styles.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} isLoading={isLoading} />
      {!!movies.length && (
        <MovieGrid
          movies={movies}
          onSelect={handleSelectMovie}
          isLoading={isLoading}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
