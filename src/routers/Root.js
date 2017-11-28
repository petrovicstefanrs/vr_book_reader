// Node Modules

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

// Enviroment settings

import * as routes from '../lib/routes';
// import store from '../store';

// Containers

import App from './App';

// Components

// Init store

import store from '../store';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
          	<Router basename="/">
        		<App />
          	</Router>
      </Provider>
    );
  }
}

export default Root;
