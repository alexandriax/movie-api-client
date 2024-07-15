
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find(m => m.id === movieId); 

    if (!movie) {
        return <div>movie not found</div>;
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
                <span>{movie.director.name}</span> 
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <Link to="/">Back</Link>
        </div>
    );

};

MovieView.propTypes = {
    movie: PropTypes.arrayOf (
        PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }).isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }).isRequired,
    })
).isRequired
}; 