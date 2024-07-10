import PropTypes from 'prop-types';
import './movie-view.scss';
import { Button, Card } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
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
            <span>{movie.director?.name}</span> 
        </div>
        <div>
            <span>Genre: </span>
            <span>{movie.genre?.name}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
    </div>
    );

};

MovieView.propTypes = {
    movie: PropTypes.shape({
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
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};