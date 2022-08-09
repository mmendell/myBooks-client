import React from "react";

function FavoritBooks(favoriteBookList) {
  return(
    <div>
      <h2>Favorite Books</h2>
      {favoriteBookList.map((books)=> {
        return (
          <div key={book_id}>
            <img src={books.ImagePath} />
            <Link to={`/books/${books._id}`}>
              <h4>{books.title}</h4>
            </Link>
            <button variant='secondary' onClick={() => { removeFav(books._id)}}>Remove from list</button>
          </div>
        )
      })
      }
    </div>
  }

export default FavoritBooks;
