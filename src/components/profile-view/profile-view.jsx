import React, { useEffect, useState } from 'react';
import {  Col, Row, Form, Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, movies, token, onLoggedOut }) => {
    const [userData, setUserData] = useState(user);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        if (movies?.length > 0) {
            setFavoriteMovies(movies.filter(m => user.favoriteMovies.includes(m._id)));
        }
    }, [user, movies]);

    const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`https://moo-movies-10a7ea08abc9.herokuapp.com/users/${user._id}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data));
            setUserData(data);
            alert('profile updated successfully');
        })
        .catch(e => console.error(e));
    };

    const handleDeregister = () => {
         fetch(`https://moo-movies-10a7ea08abc9.herokuapp.com/users/${user.user._id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(() => {
            localStorage.clear();
            onLoggedOut();
        })
        .catch(e => console.error(e));
    };

    return (
        <Row>
            <Col md={6}>
                <h2 style={{color: '#f9f8eb'}}>profile</h2>
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>username</Form.Label>
                        <Form.Control
                            type="text"
                            value={userData.username}
                            onChange={e => setUserData({ ...userData, username: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>password</Form.Label>
                        <Form.Control
                            type="password"
                            value={userData.password}
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>email</Form.Label>
                        <Form.Control
                            type="email"
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>birthday</Form.Label>
                        <Form.Control
                            type="date"
                            value={userData.birthday}
                            onChange={e => setUserData({ ...userData, birthday: e.target.value })}
                        />
                    </Form.Group>
                    <div className='d-flex justify-content-between mt-3'>
                    <Button variant="primary" type="submit">update</Button>
                    <Button variant="danger" onClick={handleDeregister}>delete account</Button>
                    </div>
                </Form>
            </Col>
            <Col md={6}>
                <h2 style={{color: '#f9f8eb'}}>favorite movies</h2>
                <Row>
                    {favoriteMovies.map(movie => (
                        <Col md={4} key={movie._id}>
                            <MovieCard 
                              movie={movie}
                              user={user}
                              token={token}
                              onFavoriteToggle={setUserData}
                              />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

ProfileView.propTypes = {
    user: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    onFavoriteToggle: PropTypes.func.isRequired,
    onLoggedOut: PropTypes.func.isRequired
};