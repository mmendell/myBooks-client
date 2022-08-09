import React from 'react';
import {Button, Container, Row, Col, Card, CardGroup} from 'react-bootstrap';
import propTypes from 'prop-types';

import Link from 'react-router-dom';

export class BookView extends React.Component {
  render() {
    const {book, onBackClick} = this.props;

    return (
      <Container fluid className='book-container'>
        <Row>
          <Col>
            <div className='book-image'>
              <img src={book.ImagePath} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="book-title">
              <span className="label">Title:</span>
              <span className="value">{book.title}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="book-description">
              <span className="label">Description:</span>
              <span className="value">{book.description}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className='book-genre'>
              <span className='label'>Genre:</span>
              <span className='value'>{book.genre.name}</span>
              <Link to={`/genres/${book.genre.name}`}>
                <Button variant='link'>Genre</Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className='book-author'>
              <span className='label'>Author:</span>
              <span className='value'>{book.author.name}</span>
              <Link to={`/authors/${book.author.name}`}>
                <Button variant='link'>Author</Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              onClick={() => {
                onBackClick(null);
              }}>
              Back
            </Button>

          </Col>
        </Row>

      </Container>


    );
  }
}
BookView.propTypes = {
  book: propTypes.shape({
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    genre: propTypes.shape({
      name: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
    }),
    author: propTypes.shape({
      name: propTypes.string.isRequired,
      bio: propTypes.string,
      birthday: propTypes.string,
    }),
  }).isRequired,
  onBookClick: propTypes.func.isRequired,
};
