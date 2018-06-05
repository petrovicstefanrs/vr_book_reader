import * as TYPES from '../types';

const INITIAL_STATE = {
	vrenvironments: {
		all_environments: [],
		loading: false,
		error: null,
	},
};

const updateEnvironments = (state, data) => {
	return Object.assign({}, state, {
		vrenvironments: Object.assign({}, state.vrenvironments, data),
	});
};

// Get Environments ---------------------------------------------------------------------------

const getEnvironmentsStart = (state, action) => {
	const data = {error: null, loading: true};
	return updateEnvironments(state, data);
};

const getEnvironmentsEnd = (state, action) => {
	const data = {all_environments: action.data, loading: false};
	return updateEnvironments(state, data);
};

const getEnvironmentsError = (state, action) => {
	const data = {error: action.error, loading: false};
	return updateEnvironments(state, data);
};

// Get Environment By Id -------------------------------------------------------------

const getEnvironmentByIdStart = (state, action) => {
	const data = {error: null, loading: true};
	return updateEnvironments(state, data);
};

const getEnvironmentByIdEnd = (state, action) => {
	const data = {all_environments: [action.data], loading: false};
	return updateEnvironments(state, data);
};

const getEnvironmentByIdError = (state, action) => {
	const data = {error: action.error, loading: false};
	return updateEnvironments(state, data);
};

// Exports ------------------------------------------------------------

export default {
	INITIAL_STATE,
	[TYPES.GET_ENVIRONMENTS_START]: getEnvironmentsStart,
	[TYPES.GET_ENVIRONMENTS_END]: getEnvironmentsEnd,
	[TYPES.GET_ENVIRONMENTS_ERROR]: getEnvironmentsError,
	[TYPES.GET_ENVIRONMENT_BY_ID_START]: getEnvironmentByIdStart,
	[TYPES.GET_ENVIRONMENT_BY_ID_END]: getEnvironmentByIdEnd,
	[TYPES.GET_ENVIRONMENT_BY_ID_ERROR]: getEnvironmentByIdError,
};
