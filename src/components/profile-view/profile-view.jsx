import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { FavoriteBookV } from './favorite-book';
import UpdateUser from './updated-user';

import { Button, Col, Row, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [books, setBooks] = useState(props.books);
  const [FavoriteBooks, setFavoriteBooks] = useState(props.FavoriteBooks);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');


  const getUser = () => {
    console.log(token);
    axios.get(`https://fierce-dawn-45347.herokuapp.com/user/${currentUser}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
        .then(response => {
          setUser(response.data);
          setFavoriteBooks(response.data.FavoriteBooks);
        })
        .catch(function(error) {
          console.log('failed to retrieve data', error);
        });
  };

  useEffect(() => {
    getUser();
  }, []);


  const handleDelete = () => {
    axios.delete(`https://fierce-dawn-45347.herokuapp.com/user/${currentUser}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
        .then(() => {
          alert(`${user.name}'s account was successfully deleted.`);
          localStorage.clear();
          window.open('/register', '_self');
        })
        .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row><h3>Your Details</h3></Row>
      <Row>
        <Col className="label">Username</Col>
        <Col className="value">{user.username}</Col>
      </Row>

      <Row >
        <Col className="label">Password</Col>
        <Col className="value">{user.password}</Col>
      </Row>

      <Row >
        <Col className="label">Email</Col>
        <Col className="value">{user.email}</Col>
      </Row>

      <Row >
        <Col className="label">Birthday</Col>
        <Col className="value">{user.birthday}</Col>
      </Row>

      <Row className="mt-5"><h3>favoite books</h3></Row>

      <Row className="mt-3">
        <FavoriteBookV
          books={books}
          FavoriteBooks={FavoriteBookV}
          currentUser={currentUser}
          token={token} />

      </Row>
      <UpdateUser user={user}/>
      <Button
        className="d-block mt-5"
        variant="danger"
        onClick={handleDelete}>Delete Account</Button>

    </Container>
  );
};
