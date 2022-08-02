/* eslint-disable linebreak-style */
import React from 'react';

export class BookCard extends React.Component {
  render() {
    const {book, onBookClick} = this.props;
    return <div className="book-card" onClick={() => {
      onBookClick(book);
    }}>{book.title}</div>;
  }
}
