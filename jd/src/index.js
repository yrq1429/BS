import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "./styles/css.css";
import "./styles/scss.scss";
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
