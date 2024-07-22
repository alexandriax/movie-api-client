import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import MOO from '../../imgs/MOO.svg'

export const NavigationBar = ({ user, onLoggedOut }) => {
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