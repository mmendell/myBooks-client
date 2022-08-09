import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import UserInfo from './user-info';
import FavoritBooks from './favorite-books';
import UpdatedUser from './updated-user';
import { Form, Container } from 'react-bootstrap';

import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap';

export function ProfileView({ books, onUpdatedUserInfo}){
 
 
 
 
  return(
    <Container>
    <div>
    <UserInfo name={user.username} email={user.email} />
    <FavoritBooks favoriteBookList={favoriteBookList} />
    <UpdatedUser handleSubmit={ handleSubmit} handleUpdate={handleUpdate} />
    </div>
    </Container>
  )
}
  // constructor(){
  //   super();
  //   this.state = {
  //     username: null,
  //     password: null,
  //     email: null,
  //     birthday: null,
  //     FavoriteBooks: [],
  //   };
  // }

  // componentDidMount() {
  //   const accessToken = localStorage.getItem('token');
  //   console.log('token');
  //   this.getUser(accessToken);
  // }

  // onRemoveFavorite = (e, book) => {
  //   const username = localStorage.getItem('username');
  //   console.log('username');
  //   const token = localStorage.getItem('token');
  //   console.log(this.props);
  //   axios.delete('https://fierce-dawn-45347.herokuapp.com/books/')
  // }


  
}
