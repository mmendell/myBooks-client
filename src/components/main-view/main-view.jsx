import React from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {NavBar} from '../navbar/navbar';
import {LoginView} from '../loginView/login-view';
import {BookCard} from '../book-card/book-card';
import {BookView} from '../book-view/book-view';
import {AuthorView} from '../author-view/author-view';
import {GenreView} from '../genre-view/genre-view';
import {RegistrationView} from '../registration-view/registration';

import {ProfileView} from '../profile-view/profile-view';
import UpdateUser from '../profile-view/updated-user';

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
    window.open('/', '_self');
  }

  setSelectedBook(book) {
    this.setState({
      selectedBook: book,
    });
  }


  render() {
    const {books, user} = this.state;

    return (
      <Router>
        <NavBar user={user} />
        <Row className='main-view justify-content-md-center'>
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <BookView
                      books={books}
                      onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (books.length === 0) return <div className='main-view' />;
              return books.map((m) => (
                <Col md={3} key={m._id}>
                  <BookCard book={m} />
                </Col>
              ));
            }}
          />
          <Route path='/register' render={() => {
            if (user) return <Redirect to="/" />;
            return <Col>
              <RegistrationView />
            </Col>;
          }} />

          <Route
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user) return <Redirect to='/' />;
              return (
                <Col>
                  <ProfileView
                    user={user}
                    onBackClick={() => history.goBack()}
                    books={books}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/update-user/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to='/' />;
              return (
                <Col>
                  <UpdateUser
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />


          <Route
            path='/books/:bookId'
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (books.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <BookView
                    book={books.find((m) => m._id === match.params.bookId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route path="/authors/:name"
            render={({match}) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (books.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <AuthorView
                    author={
                      books.find((m) => m.author.name === match.params.name)
                          .author
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (books.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={books.find(m => m.genre.name === match.params.name)
                        .genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

        </Row>
      </Router>
    );
  }
}
