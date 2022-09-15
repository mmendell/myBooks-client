import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
import {BookView} from '../book-view/book-view';
import {AuthorView} from '../author-view/author-view';
import {GenreView} from '../genre-view/genre-view';
import {RegistrationView} from '../registration-view/registration';
import BooksList from '../books-list/BooksList';
import { setBooks, setUser } from '../../actions/actions';

import ProfileView from '../profile-view/profile-view';
import UpdateUser from '../profile-view/updated-user';

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
      this.props.setUser({
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
          this.props.setBooks(response.data);
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
    const { books, user } = this.props;

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
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );

              if (books.length === 0) return <div className='main-view' />;
              return <BooksList books={books} />;
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

          <Route path="/books/authors/:name"
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

MainView.propTypes={
  books: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    Author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
    }),
  }),
  user: PropTypes.string.isRequired,
};

let mapStateToProps = state => {
  return {
    books: state.books,
    user: state.user,
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps, { setBooks, setUser })(MainView);
