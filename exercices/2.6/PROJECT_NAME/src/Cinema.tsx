import MovieItem from "./MovieItem";
import type { Movie } from '../type.ts';

interface CinemaProps {
    name: string;
    movies: Movie[];
}

const Cinema = ({ name, movies }: CinemaProps) => {
    return (
        <div>
            <h2>{name}</h2>
            <ul>
                {movies.map((movie) => (
                    <MovieItem key={movie.title} movie={movie} />
                ))}
            </ul>
        </div>
    );
}
export default Cinema;