import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

class myBooksApplication extends React.Component {
    render() {
        return (
            <div className="my-books">
                <div>Good morning</div>
            </div>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(myBooksApplication), container);
