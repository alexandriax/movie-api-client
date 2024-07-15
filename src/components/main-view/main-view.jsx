import React from "react";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token,setToken] = useState(storedToken? storedToken : null);

    useEffect(() => {
        if(!token) {
            return;
        }
        fetch('https://moo-movies-10a7ea08abc9.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
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
    }, [token]);

    if (!user) {
        return (
        <>
        <LoginView 
        onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
        }}
        />
        or
        <SignupView />
        </>
      );
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
          <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
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