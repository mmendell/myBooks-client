/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import './index.scss';

class myBooksApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(myBooksApplication), container);