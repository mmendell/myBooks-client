export const SET_BOOKS = 'SET_BOOKS';
export const SET_FILTER = 'SET_FILTER';

export function setBooks(value) {
  return {
    type: SET_BOOKS,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}
