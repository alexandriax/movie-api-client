import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('https://moo-movies-10a7ea08abc9.herokuapp.com/movies')
          .then((response) => response.json())
          .then((data) => {
            const moviesFromApi = data.docs.map ((doc) => {
                return {
                    id: doc.id,
                    title: doc.title,
                    image: doc.image || '',
                    description: doc.description,
                    director: doc.director?.name,
                    genre: doc.genre?.name
                };
            });

            setMovies(moviesFromApi);
          });
    }, []);

    if (!user) {
        return <LoginView />;
    }

    if(selectedMovie) {
        return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>the list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                  />
            ))}
        </div>
    );
};