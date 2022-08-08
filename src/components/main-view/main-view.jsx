/* eslint-disable require-jsdoc */
import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import {BookCard} from '../book-card/book-card';
import {BookView} from '../book-view/book-view';
import {LoginView} from '../loginView/login-view';
import {object} from 'prop-types';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      selectedBook: null,
      user: null,
    };
  }

  componentDidMount() {
    axios.get('https://fierce-dawn-45347.herokuapp.com')
        .then((response) => {
          this.setState({
            books: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }

  setSelectedBook(book) {
    this.setState({
      selectedBook: book,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    const {books, selectedBook, user} = this.state;

    if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (books.length === 0) return <div className="main-view" />;

    return (
      <Row className='main-view justify-content-md-center'>
        {selectedBook
        ? (
          <Col md={9}>
            <BookView book={selectedBook} onBackClick={(newSelectedBook) => {
              this.setSelectedBook(newSelectedBook);
            }} />
          </Col>
        )
          :object.values(books).map((book) => (
            <Col md={3}>
              <BookCard key={book._id} book={book} onBookClick={(newSelectedBook) => {
                this.setSelectedBook(newSelectedBook);}} />
            </Col>
          ))
        }
      </Row>
    );
  }
}

export default MainView;
