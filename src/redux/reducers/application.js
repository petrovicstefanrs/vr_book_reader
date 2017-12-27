import * as TYPES from '../types';

const INITIAL_STATE = {
	initialized: false,
	fatalError: null,
	loading: false,
};

const initialize_start = (state) => {
	return Object.assign({}, state, {
		loading: true,
		initialized: false,
		fatalError: null
	});
};

const initialize_err = (state, action) => {
	return Object.assign({}, state, {
		loading: true,
		fatalError: action.error
	});
};

const initialize_end = (state) => {
	return Object.assign({}, state, {
		loading: false,
		initialized: true,
		fatalError: null
	});
};

export default {
	INITIAL_STATE,
	[TYPES.INITIALIZE_START]: initialize_start,
	[TYPES.INITIALIZE_END]: initialize_end,
	[TYPES.INITIALIZE_ERROR]: initialize_err,
};