import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState } from 'react';
import MOO from '../../imgs/MOO.svg';
import { setSearchQuery, fetchSearchResults } from '../../redux/actions';

export const NavigationBar = ({ user, onLoggedOut, token }) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        dispatch(setSearchQuery(query));
        dispatch(fetchSearchResults(query, token));
    };

    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img 
                      src={MOO}
                      alt='cow'
                      style={{width: '100px', height: 'auto'}} 
                    />
                    moo movies
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Form inline onSubmit={handleSearch} className="d-flex">
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button type="submit" variant="primary">search</Button>
                        </Form>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    sign up
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>  
            </Container>
        </Navbar>
    );
};

NavigationBar.propTypes = {
    user: PropTypes.object,
    onLoggedOut: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
};

