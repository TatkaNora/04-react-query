import styles from "./MovieGrid.module.css";
import { Movie } from "../../types/movie";
import { PLACEHOLDERS } from "../../assets/placeholders";

interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
    if (movies.length === 0) return null;

    return (
        <ul className={styles.grid}>
            {movies.map((movie) => {
                const imageUrl = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : PLACEHOLDERS.POSTER;

                return (
                    <li key={movie.id}>
                        <div className={styles.card} onClick={() => onSelect(movie)}>
                            <img
                                className={styles.image}
                                src={imageUrl}
                                alt={movie.title}
                                loading="lazy"
                            />
                            <h2 className={styles.title}>{movie.title}</h2>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
