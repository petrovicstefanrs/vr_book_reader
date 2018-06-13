import * as TYPES from '../types';

const INITIAL_STATE = {
	themes: {
		data: null,
		loading: false,
		error: false,
	},
};

const updateThemes = (state, data) => {
	return Object.assign({}, state, {
		themes: Object.assign({}, state.themes, data),
	});
};

// Get Themes -------------------------------------------------------------

const getThemesStart = (state, action) => {
	const data = {error: null, loading: true};
	return updateThemes(state, data);
};

const getThemesEnd = (state, action) => {
	const data = {data: action.data, loading: false};
	return updateThemes(state, data);
};

const getThemesError = (state, action) => {
	const data = {error: action.error, loading: false};
	return updateThemes(state, data);
};

// Exports ------------------------------------------------------------

export default {
	INITIAL_STATE,
	[TYPES.GET_THEMES_START]: getThemesStart,
	[TYPES.GET_THEMES_END]: getThemesEnd,
	[TYPES.GET_THEMES_ERROR]: getThemesError,
};
