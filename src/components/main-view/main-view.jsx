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
            const moviesFromApi = data.docs?.map((doc) => {
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

    return (
      <BrowserRouter>
        <Row className="justify-content-md-center">
            <Routes>
                <Route
                    path="/signup"
                    element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <SignupView />
                                </Col>
                            )}
                        </>
                    }
                />
                <Route
                   path="/login"
                   element={
                    <>
                        {user ? (
                            <Navigate to="/" />
                        ) : (
                            <Col md={5}>
                                <LoginView onLoggedIn={(user) => setUser(user)} />
                            </Col>
                        )}
                    </>
                   }
                />
                <Route 
                  path="/movies/:movieId"
                  element={
                    <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : movies?.length === 0 ? (
                            <Col>The list is empty!</Col>
                        ) : (
                            <Col md={8}>
                                <MovieView movies={movies} />
                            </Col>
                        )}
                    </>
                  }
                />
                <Route
                  path="/"
                  element={
                    <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : movies?.length === 0 ? (
                            <Col>The list is empty!</Col>
                        ) : (
                            <>
                              {movies?.map((movie) => (
                                <Col className="mb-4" key={movie.id} md={3}>
                                    <MovieCard movie={movie} />
                                </Col>
                              ))}
                            </>
                        )}
                    </>
                  }
                />
            </Routes>
        </Row>
    </BrowserRouter>
    );
}; 
