import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import MOO from '../../imgs/MOO.svg';
import { SearchBar } from '../search-bar/search-bar';

export const NavigationBar = ({ user, onLoggedOut, token, onMoviesFiltered }) => {

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
                        <SearchBar token={token} onMoviesFiltered={onMoviesFiltered} />
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
    token: PropTypes.string.isRequired,
    onMoviesFiltered: PropTypes.func.isRequired
};


