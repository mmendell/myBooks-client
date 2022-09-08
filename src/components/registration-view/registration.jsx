import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

import './registration.scss';

import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [values, setValues] = useState({
    nameErr: '',
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({...values, usernameErr: 'username required'});
      isReq = false;
    } else if (username.length < 4) {
      setValues({...values, usernameErr: 'username must be at least 4 characters'});
      isReq = false;
    }
    if (!password) {
      setValues({...values, passwordErr: 'password required'});
      isReq = false;
    } else if (password.length < 8) {
      setValues({...values, passwordErr: 'password must be at least 8 characters'});
      isReq = false;
    }
    if (!email) {
      setValues({...values, emailErr: 'email required'});
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({...values, emailErr: 'invalid email'});
      isReq = false;
    }
    return isReq;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://fierce-dawn-45347.herokuapp.com/users', {
        username: username,
        password: password,
        email: email,
      })
          .then((response) => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
          })
          .catch((error) => {
            console.log('error registering', error.response.data);
          });
    }
  };

  return (
    <Row className='mt-5'>
      <Col md={12}>
        <Form>
          <h3>SIgn up</h3>
          <p></p>


          <Form.Group controlId='formUSername' className='reg-inputs'>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId='formPassword' className='reg-inputs'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId='email' className='reg-inputs'>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {values.passwordErr && <p>{values.emailErr}</p>}
          </Form.Group>

          <Form.Group controlId='birthday' className='reg-inputs'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type='date'
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>

          <Button
            className='register'
            variant='primary'
            type='submit'
            onClick={handleSubmit}
          >
            Register
          </Button>
          <p></p>
          <p>
            Already have an account? <Link to={'/'}>Sign in</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes= {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
  }),
};
