import type { Movie } from "../../types";

interface CinemaProps {
    name: string;
    movies: Movie[];
}

const Cinema = (props: CinemaProps) => {
    return (
      <div>
        <h2>{props.name}</h2>
        <ul>
          {props.movies.map((movie, index) => (
            <li key={index}>
              {movie.title} - Réalisé par {movie.director}
            </li>
          ))}
        </ul>
      </div>
    );
  };
export default Cinema;
