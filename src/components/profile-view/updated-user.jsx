import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function UpdateUser(props)
{
  const { user } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const validate = () =>
  {
    let isReq = true;
    if (!username)
    {
      setValues({ ...values, usernameErr: 'username required' });
      isReq = false;
    } else if (username.length < 2)
    {
      setValues({ ...values, usernameErr: 'username minuimum of 3 characters!' });
      isReq = false;
    }
    if (!password)
    {
      setValues({ ...values, passwordErr: 'password required' });
      isReq = false;
    } else if (password.length < 8)
    {
      setValues({ ...values, passwordErr: 'password must be at least 8 characters' });
      isReq = false;
    }
    if (!email)
    {
      setValues({ ...values, emailErr: 'email required' });
      isReq = false;
    } else if (email.indexOf('@') === -1)
    {
      setValues({ ...values, emailErr: 'invalid email' });
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const isReq = validate();
    if (isReq)
    {
      const token = localStorage.getItem('token');
      axios.put(`https://fierce-dawn-45347.herokuapp.com/users/${username}`, {
        username: username,
        password: password,
        email: email,
        birthday: birthday,
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
          .then(response =>
          {
            console.log(response.data);
            alert('profile has been updated');
            window.open('/users/:username', '_self');
          })
          .catch(error =>
          {
            console.log(error);
            alert('update was unsuccessful');
          });
    }
  };

  return (
    <Container>
      <Row><h3>Edit Profile</h3></Row>
      <Row>
        <Form>
          <Form.Group controlId='formusername'>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='username'
              required />
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId='formpassword'>
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type='text'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='password'
              required />
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId='formemail'>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='dingle@berry.com'
              required />
            {values.emailErr && <p>{values.passwordErr}</p>}
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>birthday:</Form.Label>
            <Form.Control type="text"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
              placeholder="YYYY-MM-DD" />
          </Form.Group>

          <Link to={`/users-update/`}>
            <Button className='mb-2 ml-2 button' variant='info'>
          Update your Profile
            </Button>
          </Link>
        </Form>
      </Row>
    </Container>

  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default UpdateUser;
