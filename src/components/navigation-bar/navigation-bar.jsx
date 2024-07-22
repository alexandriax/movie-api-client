import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    movies app
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="bsic-navbar-nav"/>
                <Navbar.Collapse id="basuc-navbar-nav">
                    <Nav className="me-auto">
                        { !user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    sign up
                                </Nav.Link>
                            </>
                        ) }
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