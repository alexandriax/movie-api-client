import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, onFavoriteToggle }) => {
  const isFavorite = user.favoriteMovies.includes(movie.id);

  const handleFavorite = () => {
    fetch(`https://moo-movies-10a7ea08abc9.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
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
    <Card>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Card.Text>{movie.genre}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant={isFavorite ? 'danger' : 'primary'} onClick={handleFavorite}>
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired
};




