import React from "react";
import { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { SearchBar } from "../search-bar/search-bar";
import { SearchResults } from "../search-bar/search-results";

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
            const moviesFromApi = data?.map((doc) => {
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

    return (
        <BrowserRouter>
            <NavigationBar user={user} onLoggedOut={handleLogout} />
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
                                ) : movies?.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <MovieView
                                        movies={movies}
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
                                    <ProfileView user={user} movies={movies} token={token} onLoggedOut={handleLogout} />
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
                                        {movies?.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard
                                                    movie={movie}
                                                    user={user}
                                                    token={token}
                                                    onFavoriteToggle={handleFavoriteToggle}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )
                            }
                        />
                        <Route
                            path="/search"
                            element={
                                !user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <SearchResults />
                                )
                            }
                        />
                    </Routes>
                </Row>
            </Container>
        </BrowserRouter>
    );
};


