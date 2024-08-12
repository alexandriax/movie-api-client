import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';

export const SearchResults = () => {
    const results = useSelector((state) => state.searchResults);

    return(
        <Row>
            {results.map((movie) => (
                <Col key={movie.id} md={4} lg={3}>
                    <Card>
                        <Card.Img variant='top' src={movie.image} />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>{movie.director.name}</Card.Text>
                            <Card.Text>{movie.genre.name}</Card.Text>
                            <Card.Text>{movie.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};