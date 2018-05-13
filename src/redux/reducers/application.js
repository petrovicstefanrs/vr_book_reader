import * as TYPES from '../types';

const INITIAL_STATE = {
	initialized: false,
	fatalError: null,
	loading: false,
	toast: null,
};

const initializeStart = state => {
	return Object.assign({}, state, {
		loading: true,
		initialized: false,
		fatalError: null,
	});
};

const initializeErr = (state, action) => {
	return Object.assign({}, state, {
		loading: true,
		fatalError: action.error,
	});
};

const initializeEnd = state => {
	return Object.assign({}, state, {
		loading: false,
		initialized: true,
		fatalError: null,
	});
};

const pushToast = (state, action) => {
	const {toast} = action;
	return Object.assign({}, state, {toast});
};

const dismissToast = (state, action) => {
	if (state.toast.id === action.id) {
		return Object.assign({}, state, {toast: null});
	} else {
		return state;
	}
};

export default {
	INITIAL_STATE,
	[TYPES.INITIALIZE_START]: initializeStart,
	[TYPES.INITIALIZE_END]: initializeEnd,
	[TYPES.INITIALIZE_ERROR]: initializeErr,
	[TYPES.TOAST_ADD]: pushToast,
	[TYPES.TOAST_DISMISS]: dismissToast,
};
