// Node Modules

import React, {Component} from 'react';
import {Provider} from 'react-redux';

// Components

import ThemeInjector from './ThemeInjector';

// Init store
import {store} from '../store';

class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<ThemeInjector />
			</Provider>
		);
	}
}

export default Root;
