import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

import {Link} from 'react-router-dom';

export class BookCard extends React.Component {
  render() {
    const {book} = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={book.imagePath} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.description}</Card.Text>
          <Link to={`/books/${book._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>

    );
  }
}

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birthday: PropTypes.string,
    }),
  }).isRequired,
  onBookClick: PropTypes.func.isRequired,
};
