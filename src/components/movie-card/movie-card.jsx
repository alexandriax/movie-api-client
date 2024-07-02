import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
      onClick={() => {
        onMovieClick(movie);
      }}
      >{movie.title}</div>
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
  onMovieClick: PropTypes.func.isRequired
};