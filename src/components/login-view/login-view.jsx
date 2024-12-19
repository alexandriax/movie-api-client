import React from "react";
import { useState } from "react";
import { Button, Form, Card, CardGroup, Row, Col, Container} from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://moo-movies-10a7ea08abc9.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
        .then((data) => {
            console.log("login response: ", data);
            if (data.user && data.token) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("no such user!")
            }
        })
        .catch((e) => {
            alert("something went wrong");
        });
     
    };

    return (
        <Container className='d-flex justify-content-center align-items-center min-vh-100'>
            <Row className='w-100'>
                <Col md={8} lg={8}>
                    <CardGroup>
                        <Card>
                        <Card.Body>
                        <Card.Title className='mb-4'>log-in</Card.Title>
                        <Form onSubmit={handleSubmit}>
                           <Form.Group className='mb-4'>
                           <Form.Label>
                              Username:
                              <Form.Control
                                  type="text"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  required
                                  placeholder="enter your username"
                               />
                          </Form.Label>
                          </Form.Group>

                          <Form.Group className='mb-4'>
                          <Form.Label>
                             Password:
                             <Form.Control
                                 type="password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)} 
                                 required
                                 placeholder="enter your password"
                               />
                          </Form.Label>
                          </Form.Group>
                          <Button type="submit">submit</Button>
                        </Form> 
                        </Card.Body> 
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
       

   
    );

    
};