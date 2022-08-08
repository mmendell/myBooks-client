import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardGroup, Row, Col, Container} from 'react-bootstrap';

export class BookCard extends React.Component {
  render() {
    const {book, onBookClick} = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Img variant="top" src={book.imagePath} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.description}</Card.Text>
                  <Button onClick={() => onBookClick(book)} variant="link">Open</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
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
