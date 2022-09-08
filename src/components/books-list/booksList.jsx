import React from 'react';
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux';

import {BookCard} from '../book-card/book-card';
import VisibilityFilterInput from '../visibiltity-filter-input/visibility-filter-input';

const mapStateToProps = state => {
  const {visibilityFilter} = state;
  return {visibilityFilter};
};

function BooksList(props) {
  const {books, visibilityFilter} = props;
  let filteredBooks = books;

  if (visibilityFilter !== '') {
    filteredBooks = books.filter(m => m.title.toLowerCase().includes(
        visibilityFilter.toLowerCase()));
  }

  if (!books) return <div className="main-view" />;

  return <>
    <Col md={12} style={{margin: '1em'}}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredBooks.map(m => (
      <Col md={3} key={m._id}>
        <BookCard book={m} />
      </Col>
    ))};
  </>;
}

export default connect(mapStateToProps)(BooksList);
