import PropTypes from "prop-types";
import { Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card  className="h-100 w-100" onClick={() => onMovieClick(movie)}>
        <Card.Img variant='top' src={movie.image} />
        <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director?.name}</Card.Text>
        <Card.Text>{movie.genre?.name}</Card.Text>
        </Card.Body>
      </Card>
    );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};