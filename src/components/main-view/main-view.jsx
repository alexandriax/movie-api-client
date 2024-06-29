import { useState } from "react";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        { 
            id: 1, 
            title: "princess mononoke",
            description: "1997; shows the struggle between humans and the forest gods",
            image: "https://ghiblicollection.com/cdn/shop/products/Mononoke.DVD.Cover.72dpi.jpg?v=1675795196",
            director: {
                name: "Hayao Miyazaki",
                description: "an internationally acclaimed anime director who also founded studio ghibli",
            },
            genre: {
                name: "animation",
                description: "A film technique to make still images move"
            }
        },
        { 
            id: 2, 
            title: "american mary",
            description: "a medical student resorts to offering body modification services to ease financial troubles, seeks revenge on those who wronged her",
            image: "https://outlawvern.com/wp-content/uploads/2019/11/mp_americanmary.jpg",
            director: {
                name: "Jen & Sylvia Soska",
                description: "also known as the soska sisters or the twins; they are twin sisters who collaborate in directing horror-focused films",
            },
            genre: {
                name: "horror",
                description: "A category of film meant to scre the viewer",
            }
        },
        { 
            id: 3, 
            title: "deathproof",
            description: "2007; inspired by low-budge grindhouse films, shows the story of a stuntman who uses his modified car to murder women",
            image: "https://m.media-amazon.com/images/I/71t73NDu29L._AC_SL1000_.jpg",
            director: {
                name: "Quentin Tarantino",
                description: "film director focused on stylized violence"
            },
            genre: {
                name: "slasher",
                description: "A subgenre of horror known for consistent tropes"
            }
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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