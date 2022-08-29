import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

import RegistrationView from '../registration-view/registration';
import { Container, Nav, Navbar, Form } from 'react-bootstrap';
import './login-view.scss';


export function LoginView(props)
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username){
      setUsernameErr('Username required');
      isReq = false;
    }else if(username.length < 4){
      setPasswordErr('username had to be at least 4 characters long');
      isReq= false;
    }
    if(!password){
      setPasswordErr('Password required');
      isReq= false;
    }else if(password.length < 8){
      setPasswordErr('Password must be at least 8 charachters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    const isReq = validate();
    if(isReq){
    axios.post('https://fierce-dawn-45347.herokuapp.com/login', {
      username: username,
      password: password,
    })
      .then(response =>
      {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((err) =>
      {
        console.log('login failed', err);
      })
    }
  };

  return (
    <Container fluid>
      <Navbar bg='dark' expand='lg'>
        <Navbar.Brand href='#Home'>BookENgine</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic navbar'></Navbar.Toggle>
        <Navbar.Collapse id='basic navbar'><Nav className='me-auto'>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Form>
        <Form.Group controlId='formUsername'>
          <Form.Label>username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={e => setUsername(e.target.value)} />
            {usernameErr && <p>{usernameErr}</p>}
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Label>password</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)} />
            {passwordErr && <p>{passwordErr}</p>}
        </Form.Group>
        <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.number,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};