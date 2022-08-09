import React from 'react';
import { Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import propTypes from 'prop-types';

export class BookView extends React.Component
{
  render()
  {
    const { book, onBackClick } = this.props;

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
            <Button
              onClick={() =>
              { onBackClick(null); }}>
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
