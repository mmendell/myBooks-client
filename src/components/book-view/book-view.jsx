import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';

export class BookView extends React.Component {
  render() {
    const {book, onBackClick} = this.props;

    return(
      <Container>
        <Row>
          <Col>
            <div className="book-view">
              <div className="book-poster">
                <img src={book.ImagePath} />
              </div>
            </Col>
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
            
              <Button onClick={() => {onBackClick(null);}}>Back</Button>
        
      </Container>
    );
  }
}