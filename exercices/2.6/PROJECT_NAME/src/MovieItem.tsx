import type {Movie} from '../type.ts';
import { useState } from 'react';

interface MovieItemProps {
    movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <div>
            <h2>{movie.title} - Réalisateur: {movie.director}</h2>
            <button onClick={() => setShowDescription(!showDescription)}>
                {showDescription ? 'Hide' : 'Show'} Description
            </button>
            {showDescription && <p>{movie.description}</p>}
        </div>
    );
};

export default MovieItem;
