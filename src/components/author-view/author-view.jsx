import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {Button, Col, Row, Container} from 'react-bootstrap';

export class AuthorView extends React.Component {
  render() {
    const { author, onBackClick } = this.props;

    axios.get('https://fierce-dawn-45347.herokuapp.com/books/author/:id')

    return (
      <Container className='author-view'>
        <Row>
          <Col className='label'>Author:</Col>
          <Col className='value'>{author.name}</Col>
        </Row>
        <Row>
          <Col className='label'>About the author</Col>
          <Col className='value'>{author.bio}</Col>
        </Row>
        <Row>
          <Col className='label'>BirthDay</Col>
          <Col className='value'>{author.birthday}</Col>
        </Row>
        <Button onClick={() => { onBackClick(null);}} variant='primary'>Back</Button>
      </Container>
    )
  }
} 

AuthorView.PropTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
