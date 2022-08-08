import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap';
import Card from 'react-bootstrap';

export class BookCard extends React.Component {
  render() {
    const {book, onBookClick} = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={book.imagePath} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.description}</Card.Text>
          <Button onClick={() => onBookClick(book)} variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

BookCard.PropTypes = {
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
