// Node Modules

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Enviroment settings


// Containers

import App from './App';

// Components

// Init store

import {history, store} from '../store';

const muiTheme = getMuiTheme({
    "palette": {
        "primary1Color": "#673ab7",
        "primary2Color": "#512da8",
        "pickerHeaderColor": "#673ab7"
    }
});

class Root extends Component {
	render() {
	    return (
			<Provider store={store} history={history}>
				<MuiThemeProvider muiTheme={muiTheme}>
					<Router basename="/">
						<App />
					</Router>
				</MuiThemeProvider>
			</Provider>
	    );
  	}
}

export default Root;
