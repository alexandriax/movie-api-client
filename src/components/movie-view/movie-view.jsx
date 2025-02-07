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
        fetch(`https://moo-movies-10a7ea08abc9.herokuapp.com/users/${user.user._id}/movies/${movie._id}`, {
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
        <div className='single-movie'>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span className='big-words'>Title: </span> <br></br>
                <span className='info'>{movie.title}</span>
            </div>
            <div>
                <span className='big-words'>Description: </span> <br></br>
                <span className='info'>{movie.description}</span>
            </div>
            <div>
                <span className='big-words'>Director: </span> <br></br>
                <span className='info'>{movie.director.name}</span> 
            </div>
            <div>
                <span className='big-words'>Genre: </span> <br></br>
                <span>{movie.genre.name}</span>
            </div>
            <div className='btn-container'>
            <Link to={`/`}>
                <Button className="back-button">Back</Button>
            </Link>
            <Button variant={isFavorite ? 'danger' : 'primary'} onClick={handleFavorite} className='fav-button'>
                {isFavorite ? 'Unfavorite' : 'Favorite'}
            </Button>
            </div>
        </div>
    );
};

MovieView.propTypes = {
    movies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    onFavoriteToggle: PropTypes.func.isRequired
};



