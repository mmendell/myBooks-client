import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from 'react-bootstrap';

export function FavoriteBookView(props) {
  const { books, favoriteBooks,thisUser, token } = props;

  const favoriteBooksList = books.filter((m) => {
    return favoriteBooks.includes(m_.id);
  });

  const hadleBookDelete = (bookId) => {
    axios
        .delete(`https://fierce-dawn-45347.herokuapp.com/users/${thisUser}/books/${bookId}`,
            {headers: {Authorization: `Bearer ${token}`} },
        )
        .then(() => {
          window.location.reload();
        })
        .catch((error) => console.error(error));
  };

  return (
    <>
      {favoriteBooksList.length === 0 ? (
      <p>nothing added to favorites yet!</p>
    ) : (
      favoriteBooksList.map((book) => {
        return(
          <Row>
            <Col>
              <Card className="fav-card">
                <Link to={`/books/${book._id}`}>
                  <Card.Img
                    variant="top"
                    src={book.ImageURL}
                    style={{ height: '20rem'}}
                  />
                </Link>

                <Card.Body>
                  <Card.Title>
                    <h6>{book.title}</h6>
                  </Card.Title>
                  <Link to={`/books/${book._id}`}>
                    <Button size="sm" className="button">
                    open
                    </Button>
                  </Link>
                  <Button 
                    className="ml-2 delete-button"
                    variant="info"
                    size="sm"
                    onClick={() => {
                      hadleBookDelete(book._id);
                    }}
                  >
                  remove from list
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      })
    )
      }
    </>
  );
};
