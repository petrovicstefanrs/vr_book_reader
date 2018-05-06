import * as TYPES from '../types';

const INITIAL_STATE = {
	auth: {
		user: null,
		loading: false,
		error: null,
		token: null,
		message: null,
		loged_in: false,
		redirect: null
	},
};

//**********************************************************************************************************************
// Reducer helper functions

const updateAuth = (state, op) => {
	return Object.assign({}, state, {
		auth: Object.assign({}, state.auth, op)
	});
};

//**********************************************************************************************************************
// Reducers

// LOGIN
const loginStart = (state) => {
	const op = {
		error: null,
		loading: true,
		token: null
	};

	return updateAuth(state, op);
};

const loginEnd = (state, action) => {
	const op = {
		loading: false,
		user: action.data.user,
		token: action.data.token,
		loged_in: true,
		message: null
	};

	return updateAuth(state, op);
};

const loginError = (state, action) => {
	const message = action.data
		? action.data.message
		: action.error
			? action.error.message
			: null;

	const op = {
		loading: false,
		error: action.error,
		message: message,
		loged_in: false
	};

	return updateAuth(state, op);
};

// LOGIN WITH TOKEN
const loginTokenStart = (state, action) => {
	const op = {
		error: null,
		loading: true,
		token: action.data.token
	};

	return updateAuth(state, op);
};

const loginTokenEnd = (state, action) => {
	const op = {
		loading: false,
		user: action.data.user,
		loged_in: true,
		message: null
	};

	return updateAuth(state, op);
};

const loginTokenError = (state, action) => {

	const message = action.data
		? action.data.message
		: action.error
			? action.error.message
			: null;

	const op = {
		loading: false,
		error: action.error,
		message: message,
		loged_in: false
	};

	return updateAuth(state, op);
};

// REGISTER
const registerStart = (state) => {
	const op = {
		error: null,
		loading: true,
		token: null,
		user: null,
		loged_in: false
	};

	return updateAuth(state, op);
};

const registerEnd = (state, action) => {
	const message = action.data
		? action.data.message
		: action.error
			? action.error.message
			: null;

	const op = {
		loading: false,
		message: message
	};

	return updateAuth(state, op);
};

const registerError = (state, action) => {
	const message = action.data
		? action.data.message
		: action.error
			? action.error.message
			: null;

	const op = {
		loading: false,
		error: action.error,
		message: message
	};

	return updateAuth(state, op);
};

// LOGOUT
const logoutStart = (state) => {
	const op = {
		loading: true,
		error: null
	};

	return updateAuth(state, op);
};

const logoutEnd = (state) => {
	return updateAuth(state, INITIAL_STATE.auth);
};

// MISC

const clearMessage = (state) => {
	const op = {
		error: null,
		message: null
	};

	return updateAuth(state, op);
};

const setAuthRedirect = (state, action) => {
	return updateAuth(state, {
		redirect: action.data
	});
};



export default {
	INITIAL_STATE,
	[TYPES.LOGIN_START]: loginStart,
	[TYPES.LOGIN_END]: loginEnd,
	[TYPES.LOGIN_ERROR]: loginError,

	[TYPES.LOGIN_TOKEN_START]: loginTokenStart,
	[TYPES.LOGIN_TOKEN_END]: loginTokenEnd,
	[TYPES.LOGIN_TOKEN_ERROR]: loginTokenError,

	[TYPES.REGISTER_START]: registerStart,
	[TYPES.REGISTER_END]: registerEnd,
	[TYPES.REGISTER_ERROR]: registerError,

	[TYPES.LOGOUT_START]: logoutStart,
	[TYPES.LOGOUT_END]: logoutEnd,
	[TYPES.AUTH_CLEAR_MESSAGE]: clearMessage,
	[TYPES.AUTH_SET_REDIRECT]: setAuthRedirect
};