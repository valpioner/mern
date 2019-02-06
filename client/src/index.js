
import 'bootstrap/dist/css/bootstrap.min.css';
//Added Bootstrap as deps (npm install jquery popper.js)
//probably better to switch to react bootstrap components instead
//https://blog.logrocket.com/how-to-use-bootstrap-with-react-a354715d1121
//react-bootstrap || reactstrap
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
