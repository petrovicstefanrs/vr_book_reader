// Node Modules

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// Enviroment settings


// Containers

import App from './App';

// Components

// Init store

import {history, store} from '../store';

const muiTheme = createMuiTheme({
});

class Root extends Component {
	render() {
	    return (
			<Provider store={store} history={history}>
				<MuiThemeProvider theme={muiTheme}>
					<Router basename="/">
						<App />
					</Router>
				</MuiThemeProvider>
			</Provider>
	    );
  	}
}

export default Root;
