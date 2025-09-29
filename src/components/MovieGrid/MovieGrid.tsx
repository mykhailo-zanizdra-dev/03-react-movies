import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';
import imgPlaceholder from '../../assets/img_placeholder.webp';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map(movie => (
        <li key={movie.id} onClick={() => onSelect(movie)} className={css.item}>
          <div className={css.card}>
            <img
              className={css.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : imgPlaceholder
              }
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
