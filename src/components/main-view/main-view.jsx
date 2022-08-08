import React from 'react';
import { BookCard } from '../book-card/book-card';
import { BookView } from '../book-view/book-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      books: [
        { _id: 1, title: 'the black swan', description: 'desc1....', ImagePath: '...' },
        { _id: 2, title: 'noise', description: 'desc2 ....', ImagePath: '...' },
        { _id: 3, title: 'mans search for meaning', description: 'desc3.....', ImagePath: '...' }
      ],
      selectedBook: null
    };
  }

<<<<<<< Updated upstream
  setSelectedBook(newSelectedBook) {
=======
  componentDidMount() {
    axios.get('https://fierce-dawn-45347.herokuapp.com')
        .then(response => {
          this.setState({
            books: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }

  setSelectedBook(book) {
>>>>>>> Stashed changes
    this.setState({
      selectedBook: newSelectedBook
    });
  }

  render() {
    const { books, selectedBook } = this.state;

    if (books.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedBook
                    ? <BookView book={selectedBook} onBackClick={newSelectedBook => { this.setSelectedBook(newSelectedBook); }} />
                    : books.map(book => (
                      <BookCard key={book._id} book={book} onBookClick={(book) =>
                      {this.setSelectedBook(book)}
                      } />
                    ))
        }
      </div>
    );
  }
}

export default MainView;
