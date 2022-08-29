import React, {useState} from 'react';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';
import propTypes from 'prop-types';
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
    if (name) {
      setValues({...values, nameErr: 'name is required'});
      isReq = false;
    }
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
          .catch((e) => {
            console.log('error registering');
          });
    }
  };

  return (
    <Container>
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
                      {...values.usernameErr && <p>{values.usernameErr} </p> }
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
                      {...values.passwordErr && <p>{values.passwordErr} </p> }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='richard@tomsmith.com'
                      {...values.emailErr && <p>{values.emailErr}</p> }
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

RegistrationView.propTypes= {
  register: propTypes.shape({
    name: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
  }),
};
