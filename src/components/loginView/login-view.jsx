import React, {useState} from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

import { RegistrationView } from '../registration-view/registration';
import { Container, Nav, Navbar,  } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    axios.post('https://fierce-dawn-45347.herokuapp.com/login', {
      username: username,
      password: password,
    })
    .then(response => {
      const data = response.data;
      console.log(data);
    })
    .catch((err) => {
      console.log('login failed', err);
    })
    console.log(username, password);
  };

  return (
    <Container fluid>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#Home'>BookENgine</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic navbar'></Navbar.Toggle>
        <Navbar.Collapse id='basic navbar'><Nav className='me-auto'>
          <Nav.Link href='../registration-view/registration.jsx'>Register</Nav.Link>
          </Nav>
          </Navbar.Collapse>
      </Navbar>
    
    <Form>
      <Form.Group controlId='formUsername'>
        <Form.Label>username</Form.Label>
        <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>password</Form.Label>
        <Form.Control type='text' onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
    </Form>
    </Container>
  );
}
