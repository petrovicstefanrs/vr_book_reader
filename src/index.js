// Node Modules

import React from 'react';
import ReactDOM from 'react-dom';

// Enviroment settings

import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Containers

import Root from './routers/Root';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
