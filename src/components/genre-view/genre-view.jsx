import React from "react";
import PropTypes from 'prop-types';

import { Button, Col, Row, Container } from 'react-bootstrap';
import { render } from "react-dom";

export function GenreView() {
  render(){
    const { genre, onBackClick } = this.props;

  }

    return (
      <Container className="genre-view">
        <Row>
          <Col className="label">Genre: </Col>
          <Col className="value">{genre.name}</Col>
        </Row>

        <Row>
          <Col className="label">Description</Col>
          <Col className="value">{genre.description}</Col>
        </Row>
        <Button onClick={() => {onBackClick(null); }} variant='primary'>Back</Button>
      </Container>
    )
  }


GenreView.PropTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired
};