// NODE MODULES

import {combineReducers} from 'redux';

// REDUCERS

import application from './reducers/application';

/**
 * Create Reducer Handlers
 * This is going to create a root reducer to apply to createStore function
 */

const INITIAL_STATE = {};
const HANDLERS = {};

[application].forEach(handlers => {
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
