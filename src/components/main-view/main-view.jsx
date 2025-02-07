import React from "react";
import { useEffect, useState } from 'react';
import { Col, Row, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { SearchBar } from "../search-bar/search-bar";


export const MainView = () => {
    const [movies, setMovies] = useState([]); 
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const handleLogin = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    const handleFavoriteToggle = (updatedUser) => {
        setUser(updatedUser);
    };

   const handleMoviesFiltered = (movies) => {
    setFilteredMovies(movies);
   };

   useEffect(() => {
    if (token) {
        fetch('https://moo-movies-10a7ea08abc9.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                setMovies(data);
                setFilteredMovies(data);
            })
            .catch(err => console.error(err));
        }
    }, [token]);


    return (
        <BrowserRouter>
        
            
            <NavigationBar user={user} onLoggedOut={handleLogout} token={token} onMoviesFiltered={handleMoviesFiltered} />
        
            <Container>
                <Row className="justify-content-md-center">
              
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={handleLogin} />
                                    </Col>
                                )
                            }
                        />
                        <Route
                            path="/movies/:movieId"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : filteredMovies?.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <MovieView
                                        movies={filteredMovies}
                                        user={user}
                                        token={token}
                                        onFavoriteToggle={handleFavoriteToggle}
                                    />
                                )
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <ProfileView user={user} movies={filteredMovies} token={token} onLoggedOut={handleLogout} onFavoriteToggle={handleFavoriteToggle} />
                                )
                            }
                        />
                        <Route
                            path="/"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : movies?.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {filteredMovies?.map((movie) => (
                                            <Col className="mb-4" key={movie._id} md={3}>
                                                <MovieCard
                                                    movie={movie}
                                                    user={user}
                                                    token={token}
                                                    onFavoriteToggle={handleFavoriteToggle}
                                                    director={movie.director}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )
                            }
                        />
                    </Routes>
                </Row>
            </Container>
        </BrowserRouter>
    );
};




