// Node Modules

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// Enviroment settings


// Containers

import App from './App';

// Components

// Init store

import {history, store} from '../store';

const muiTheme = createMuiTheme({
	palette: {
		type: 'light', // Switching the dark mode on is a single property value change.
	  },
});

class Root extends Component {
	render() {
	    return (
			<Provider store={store}>
				<MuiThemeProvider theme={muiTheme}>
					<Router history={history} basename="/">
						<App />
					</Router>
				</MuiThemeProvider>
			</Provider>
	    );
  	}
}

export default Root;
