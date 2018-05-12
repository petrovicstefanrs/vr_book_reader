// REDUCERS

import application from './reducers/application';
import auth from './reducers/auth';
import menu from './reducers/menu';
import books from './reducers/books';
import {routerReducer} from 'react-router-redux';
/**
 * Create Reducer Handlers
 * This is going to create a root reducer to apply to createStore function
 */

const INITIAL_STATE = {};
const HANDLERS = {};

[routerReducer, application, auth, menu, books].forEach(handlers => {
	if (handlers.INITIAL_STATE) {
		Object.assign(INITIAL_STATE, handlers.INITIAL_STATE);
		delete handlers.INITIAL_STATE;
	}
	Object.assign(HANDLERS, handlers);
});

export default (state = INITIAL_STATE, action = {}) => {
	const handler = HANDLERS[action.type];
	if (!handler) {
		return state;
	}

	return handler(state, action);
};
