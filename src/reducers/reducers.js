import {combineReducers} from 'redux';

import {SET_FILTER, SET_BOOKS} from '../actions/actions';

function visibilityFilter( state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function books(state = [], action) {
  switch (action.type) {
    case SET_BOOKS:
      return action.value;
    default:
      return state;
  }
}

const booksApp = combineReducers({
  visibilityFilter,
  books,
});

export default booksApp;
