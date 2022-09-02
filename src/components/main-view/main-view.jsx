import React from 'react';
import axios from 'axios';

import { Connect } from 'react-redux';

import {BrowserRouter as Router, Routes, Route, Redirect, Link} from 'react-router-dom';

import { setBooks } from '../../actions/actions';
import BooksList from '../books-list/books-list';

import {Row, Col} from 'react-bootstrap';

import {BookCard} from '../book-card/book-card';
import {BookView} from '../book-view/book-view';
import {LoginView} from '../loginView/login-view';
import {RegistrationView} from '../registration-view/registration';
import {AuthorView} from '../author-view/author-view';
import {GenreView} from '../genre-view/genre-view';
import {NavBar} from '../navbar/navbar';
import { connect } from 'mongoose';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
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
        .then(response => {
          this.props.setBooks(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {
    let {books} = this.props;
    let {user} = this.props;

    return (
      <Router>
        <Row>
          <NavBar user={user} />
        </Row>
        <Row className='main-view justify-content-md-center'>
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>

              if (books.length === 0) return <div className='main-view'>;

                  return <BooksList books={books}/>;

          <Route path='/register' render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>;
          }} />

          <Route path='/books/bookId' render={({match, history}) => {
            return <Col md={8}>
              <BookView book={books.find((m) => m._id === match.params.bookId)}
                onBackClick={() => history.goBack()} />
            </Col>;
          }} />

          <Route path="/authors/:name" render={({match}) => {
            if (books.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <AuthorView author={books.find(m => m.author.name === match.params.name).author} />
            </Col>;
          }} />

          <Route path="/genres/:name" render={({match}) => {
            if (books.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={books.find(m => m.genre.name === match.params.name).genre} />
            </Col>;
          }} />

        </Row>
      </Router>
    );
  }
}
let mapStateToProps = state => {
  return {books: state.books}
}

export default connect(mapStateToProps, { setBooks} )(MainView);
