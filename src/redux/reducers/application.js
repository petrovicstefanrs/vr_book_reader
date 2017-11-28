import {combineReducers} from 'redux';

import * as TYPES from '../types';

const INITIAL_STATE = {
	// We don't render anything until this is true
	initialized: false,

	// We show full screen error and user is forced to reload
	fatalError: null,

	// Used for testing
	loading: false,
};

const initialized = (state) => {
	return Object.assign({}, state, {
		initialized: true
	});
};

export default {
	INITIAL_STATE,
	[TYPES.INITIALIZED]: initialized,
}