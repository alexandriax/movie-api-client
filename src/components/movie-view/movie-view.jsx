import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

export const MovieView = ({ movie }) => {
    const { movieId } = useParams();

    if (!movie) {
        return <div>Movie not found</div>;
    }
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span> 
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <Link to="/">Back</Link>
        </div>
    );

};

MovieView.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
    }).isRequired
};



