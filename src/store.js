// Node Modules

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import cookie from 'js-cookie';
import logger from 'redux-logger'

// Enviroment settings

import * as http from './lib/http';
import reducer from './redux/index';

const container = {
	http,
	cookie
};

const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(container), logger));

export default store;