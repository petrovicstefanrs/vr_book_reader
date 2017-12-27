// Node Modules

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

// Enviroment settings


// Containers

import App from './App';

// Components

// Init store

import {history, store} from '../store';


class Root extends Component {
	render() {
	    return (
			<Provider store={store} history={history}>
				<Router basename="/">
					<App />
				</Router>
			</Provider>
	    );
  	}
}

export default Root;
