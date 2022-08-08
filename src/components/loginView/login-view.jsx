import React, {useState} from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://fierce-dawn-45347.herokuapp.com/login', {
      username: username,
      password: password,
    })
        .then((response) => {
          const data = response.data;
          console.log(data);
        })
        .catch((err) => {
          console.log('login failed', error);
        });
    console.log(username, password);
  };

  return (
    <Form>
      <Form.Group controlId='formUsername'>
        <Form.Label>username</Form.Label>
        <Form.Control
          type='text'
          onChange={(e) =>
            setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>password</Form.Label>
        <Form.Control
          type='text'
          onChange={(e) =>
            setPassword(e.target.value)} />
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
