export const SET_BOOKS = 'SET_BOOKS';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const ADD_FAVBOOK = 'ADD_FAVBOOK';
export const REM_FAVBOOK ='REM_FAVBOOK';

export function setBooks(value) {
  return {
    type: SET_BOOKS,
    value,
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function addFavBook(value) {
  return {
    type: ADD_FAVBOOK,
    value,
  };
}

export function remFavBOok(value) {
  return {
    type: REM_FAVBOOK,
    value,
  };
}
