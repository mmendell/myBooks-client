import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {setUser} from '../../actions/actions';
import { Link } from 'react-router-dom';

import { Button, Col, Row, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import UpdateUser from './updated-user';

function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [FavoriteBooks, setFavoriteBooks] = useState(props.FavoriteBooks);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');


  const getUser = () => {
    console.log(token);
    axios.get(`https://fierce-dawn-45347.herokuapp.com/users/${currentUser}`, {
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
        <Col className="value">********</Col>
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

      {/* <Row className="mt-3">
        <FavoriteBookV
          // books={books}
          FavoriteBooks={FavoriteBookV}
          currentUser={currentUser}
          token={token} />

      </Row> */}


      <UpdateUser />

      <Button
        className="d-block mt-5"
        variant="danger"
        onClick={handleDelete}>Delete Account
      </Button>

    </Container>
  );
};

let mapStateToProps = state => {
  return {
    books: state.books,
    user: state.user,
    favorites: state.favorites,
  };
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, { setUser})(ProfileView);
