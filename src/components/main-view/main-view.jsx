import React from "react";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const storedToken = localStorage.getItem('token');
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch('https://moo-movies-10a7ea08abc9.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((doc) => {
                return {
                    id: doc.id,
                    title: doc.title,
                    image: doc.image,
                    description: doc.description,
                    director: doc.director,
                    genre: doc.genre
                };
            });

            setMovies(moviesFromApi);
        });
    }, [token]);


    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem('user', JSON.stringify(user));
                        localStorage.setItem('token', token);
                    }} />
                    or
                    <SignupView />
                </>
            ) : selectedMovie ? (
                <Col md={8}>
                    
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
};
