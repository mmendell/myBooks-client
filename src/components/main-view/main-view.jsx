import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {Row, Col} from 'react-bootstrap';

import {BookCard} from '../book-card/book-card';
import {BookView} from '../book-view/book-view';
import {LoginView} from '../loginView/login-view';
import {RegistrationView} from '../registration-view/registration';
import propTypes from 'prop-types';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      user: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getBooks(accessToken);
    }
  }

  setSelectedBook(book) {
    this.setState({
      selectedBook: book,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username,
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getBooks(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  getBooks(token) {
    axios.get('https://fierce-dawn-45347.herokuapp.com/books', {
      headers: {Authorization: `Bearer ${token}`},
    })
        .then((response) => {
          this.setState({
            books: response.data,
          });
        })
        .catch(function(error) {
          console.log(error);
        });
  }

  render() {
    const {books, selectedBook, user} = this.state;

    if (!user) {
      return <Row>
        <Col>
          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
        </Col>
      </Row>;
    };

    if (books.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Row className='main-view justify-content-md-center'>
          <Route exact path='/' render={() => {
            return books.map((m)=> (
              <Col md={3} key={m._id}>
                <BookCard book={m} />
              </Col>
            ));
          }} />

          <Route path='/books/bookId' render={({match, history}) => {
            return <Col md={8}>
              <BookView book={books.find((m) => m._id === match.params.bookId)} 
                onBackClick={() => history.goBack()} />
            </Col>;
          }} />

        </Row>
      </Router>
    );
  }
}

export default MainView;
