import React from 'react';
import PropTypes from 'prop-types';

export class BookCard extends React.Component {
  render() {
    const {book, onBookClick} = this.props;

    return(
     <div onClick={() => onBookClick(book)} className="book-card">{book.title}</div>;
  )}

  BookCard.PropTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      }),
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string,
        birthday: PropTypes.string,
      }),
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };
}
