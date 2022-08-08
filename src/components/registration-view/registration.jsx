import React, {useState} from 'react';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';

import './registration.scss';
import axios from 'axios';

export function RegistrationView(props)
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    axios.post('https://fierce-dawn-45347.herokuapp.com/users', {
      username: username,
      password: password,
      email, email,
    })
        .then(response =>
        {
          const data = response.data;
          console.log(data);
        })
        .catch(e =>
        {
          console.log('error registering');
        });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>

                <Card.Title>Register</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder='enter a username'
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      placeholder='password must be at least 8 characters'
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='richard@tomsmith.com'
                    />
                  </Form.Group>
                  <Button variant='primary' type='submit'
                    onClick={handleSubmit}>Submit</Button>

                </Form>
              </Card.Body>
            </Card>
          </CardGroup>

        </Col>
      </Row>
    </Container>


  );
}

export default registerView;

