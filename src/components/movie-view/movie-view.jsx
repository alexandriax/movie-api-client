import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';


export const MovieView = ({ movies, user, token, onFavoriteToggle }) => {
    const { movieId } = useParams();
    const movie = movies.find(m => m._id === movieId);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    const isFavorite = user.favoriteMovies.includes(movie._id);

    const handleFavorite = () => {
        fetch(`https://moo-movies-10a7ea08abc9.herokuapp.com/users/${user.username}/movies/${movie._id}`, {
            method: isFavorite ? 'DELETE' : 'POST',
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(updatedUser => {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            onFavoriteToggle(updatedUser);
        })
        .catch(e => console.error(e));
    };

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
            <Link to={`/`}>
                <Button className="back-button">Back</Button>
            </Link>
            <Button variant={isFavorite ? 'danger' : 'primary'} onClick={handleFavorite}>
                {isFavorite ? 'Unfavorite' : 'Favorite'}
            </Button>
        </div>
    );
};

MovieView.propTypes = {
    movies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    onFavoriteToggle: PropTypes.func.isRequired
};


