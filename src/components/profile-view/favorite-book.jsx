import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {Link} from 'react-router-dom';
import {Button, Card, Col} from 'react-bootstrap';

export function FavoriteBookV(props) {
  const {book, FavoriteBooks, currentUser, token} = props;

  const favoriteBookId = FavoriteBooks.map(m => m._id);

  const FavoriteBooksList = books.filter(m => {
    return favoriteBookId.includes(m._id);
  });

  const handleBookDelete = (bookId) => {
    axios.delete(`https://fierce-dawn-45347.herokuapp.com/user/${currentUser}/books/${bookId}`, {
      headers: {Authorization: 'Bearer ${token}'},
    })
        .then(() => {
          alert('this book was removed from favorites');
          window.open('/users/:username', '_self');
        })
        .catch((error) => console.error(error));
  };

  return(
    <Fragment>
      {FavoriteBooksList.length === 0 ? (
        <p>this list is empty</p>
      ) : (
        FavoriteBooksList.map((m) => {
          return (
            <Col xs={10} sm={8} md={6} lg={4}>
              <Card id='book-card'>
                <Link to={`books/${book_id}`}>
                  <Card.Img variant='top' src={book.ImagePath} />
                </Link>
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.description}</Card.Text>
                  <Link to={`/books/${book._id}`}>
                    <Button
                      className='button'
                      variant='outline-primary'
                      size='sm'>
                    Open</Button>
                  </Link>
                  <Button
                    className='button ml-2'
                    variant='outline-primary'
                    size='sm'
                    onClick={()=> {
                      handleBookDelete(book_id);
                    }} >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      )}
    </Fragment>
  );
}
