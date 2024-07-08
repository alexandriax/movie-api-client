import{ useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {};
      event.preventDefault();

      const data ={
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      };

      fetch("https://moo-movies-10a7ea08abc9.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
      }).then((response) => {
        if(response.ok) {
            alert("signup successful!");
            window.location.reload();
        } else {
            alert("signup failed!");
        }
      });
       
    return (
      <Container>
        <Row>
          <Col md={5}>
            <CardGroup>
            <Card>
            <Card.Body>
            <Card.Title>sign up</Card.Title>
            <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>
                Username:
               <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="3"
                  placeholder="enter a username"
               />
              </Form.Label>
             </Form.Group>
            <Form.Group>
              <Form.Label>
                Password:
               <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                  placeholder="password must be 6 or more characters"
               />
             </Form.Label>
           </Form.Group>
           <Form.Group>
             <Form.Label>
                Email:
               <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="enter an email"
               />
             </Form.Label>
           </Form.Group>
           <Form.Group>
             <Form.Label>
                Birthday: 
               <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  placeholder="enter a birthday"
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