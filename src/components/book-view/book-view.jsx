/* eslint-disable linebreak-style */
import React from "react";

export class BookView extends React.Component {
  render() {
    const { book } = this.props;

    return(
      <div className="book-view">
        <div className="book-poster">
          <img src="{book.ImagePath}" />
        </div>
        <div className="book-title">
          <span className="label">Title:</span>
          <span className="value">{book.title}</span>
        </div>
        <div className="book-description">
          <span className="label">Description:</span>
          <span className="value">{book.description}</span>
        </div>
        <button onClick={() => {onBackClick(null);}}>Back</button>
      </div>
    );
  }
}