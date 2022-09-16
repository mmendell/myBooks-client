import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import './login-view.scss';
import axios from 'axios';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 4) {
      setPasswordErr('username had to be at least 4 characters long');
      isReq= false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq= false;
    } else if (password.length < 8) {
      setPasswordErr('Password must be at least 8 charachters long');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
          .post('https://fierce-dawn-45347.herokuapp.com/login', {
            username: username,
            password: password,
          })
          .then((response) => {
            const data = response.data;
            props.onLoggedIn(data);
            window.open('/', '_self');
          })
          .catch((err) => {
            console.log('login failed', err);
          });
    }
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <Card className="login">
            <Card.Body>
              <Card.Title>Log in</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="TomSmith"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {/* code added here to display validation error */}
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* code added here to display validation error */}
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Button
                  className="login-button"
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <br></br>
                <p>
                  Need an account? <Link to={'/register'}>Sign up</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setUser })(LoginView);
