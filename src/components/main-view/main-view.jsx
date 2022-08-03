/* eslint-disable require-jsdoc */
import React from 'react';
import axios from 'axios';


import {BookCard} from '../book-card/book-card';
import {BookView} from '../book-view/book-view';
import {LoginView} from '../loginView/login-view';

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
    axios.get('https://fierce-dawn-45347.herokuapp.com/')
        .then(response => {
          this.setState ({
            books: response.data,
          });
        })
        .catch(error => {
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

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (books.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedBook ?
          <BookView book={selectedBook} onBackClick={newSelectedBook => {
            this.setSelectedBook(newSelectedBook);
          }} /> 
          : books.map(book => (
            <BookCard key={book._id} book={book} onBookClick={(book) => {
              this.setSelectedBook(book);
            }
            } />
          ))
        }
      </div>
    );
  }
}

export default MainView;
