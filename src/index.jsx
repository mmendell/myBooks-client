import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/esm/Container';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import booksApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

import './index.scss';

const store = createStore(booksApp, devToolsEnhancer);

class myBooksApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>

    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(myBooksApplication), container);
