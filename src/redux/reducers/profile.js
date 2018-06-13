import * as TYPES from '../types';

const INITIAL_STATE = {
	profile: {
		user: null,
		loading: false,
		error: null,
        updating: false,

	},
};

const updateProfile = (state, data) => {
	return Object.assign({}, state, {
		profile: Object.assign({}, state.profile, data),
	});
};

// Get User -------------------------------------------------------------

const getUserStart = (state, action) => {
	const data = {error: null, loading: true};
	return updateProfile(state, data);
};

const getUserEnd = (state, action) => {
	const data = {user: action.data, loading: false};
	return updateProfile(state, data);
};

const getUserError = (state, action) => {
	const data = {error: action.error, loading: false};
	return updateProfile(state, data);
};

// Update Avatar ---------------------------------------------------

const updateUserAvatarStart = (state, action) => {
	const data = {error: null, uploading: true};
	return updateProfile(state, data);
};

const updateUserAvatarEnd = (state, action) => {
	const data = {error: null, uploading: false};
	return updateProfile(state, data);
};

const updateUserAvatarError = (state, action) => {
	const data = {error: action.error, uploading: false};
	return updateProfile(state, data);
};

// Update Details ---------------------------------------------------

const updateProfileDetailsStart = (state, action) => {
	const data = {error: null};
	return updateProfile(state, data);
};

const updateProfileDetailsEnd = (state, action) => {
	const data = {user: action.data};
	return updateProfile(state, data);
};

const updateProfileDetailsError = (state, action) => {
	const data = {error: action.error};
	return updateProfile(state, data);
};

// Update Password ---------------------------------------------------

const updateProfilePasswordStart = (state, action) => {
	const data = {error: null};
	return updateProfile(state, data);
};

const updateProfilePasswordEnd = (state, action) => {
	const data = {user: action.data};
	return updateProfile(state, data);
};

const updateProfilePasswordError = (state, action) => {
	const data = {error: action.error};
	return updateProfile(state, data);
};

// Update Deactivate ---------------------------------------------------

const updateProfileDeactivateStart = (state, action) => {
	const data = {error: null};
	return updateProfile(state, data);
};

const updateProfileDeactivateEnd = (state, action) => {
	const data = {user: action.data};
	return updateProfile(state, data);
};

const updateProfileDeactivateError = (state, action) => {
	const data = {error: action.error};
	return updateProfile(state, data);
};

// Update Theme ---------------------------------------------------

const updateProfileThemeStart = (state, action) => {
	const data = {error: null};
	return updateProfile(state, data);
};

const updateProfileThemeEnd = (state, action) => {
	const data = {user: action.data};
	return updateProfile(state, data);
};

const updateProfileThemeError = (state, action) => {
	const data = {error: action.error};
	return updateProfile(state, data);
};

// Exports ------------------------------------------------------------

export default {
	INITIAL_STATE,
	[TYPES.GET_USER_START]: getUserStart,
	[TYPES.GET_USER_END]: getUserEnd,
	[TYPES.GET_USER_ERROR]: getUserError,
	[TYPES.UPDATE_USER_AVATAR_START]: updateUserAvatarStart,
	[TYPES.UPDATE_USER_AVATAR_END]: updateUserAvatarEnd,
	[TYPES.UPDATE_USER_AVATAR_ERROR]: updateUserAvatarError,
	[TYPES.UPDATE_PROFILE_DETAILS_START]: updateProfileDetailsStart,
	[TYPES.UPDATE_PROFILE_DETAILS_END]: updateProfileDetailsEnd,
	[TYPES.UPDATE_PROFILE_DETAILS_ERROR]: updateProfileDetailsError,
	[TYPES.UPDATE_PROFILE_PASSWORD_START]: updateProfilePasswordStart,
	[TYPES.UPDATE_PROFILE_PASSWORD_END]: updateProfilePasswordEnd,
	[TYPES.UPDATE_PROFILE_PASSWORD_ERROR]: updateProfilePasswordError,
	[TYPES.UPDATE_PROFILE_DEACTIAVATE_START]: updateProfileDeactivateStart,
	[TYPES.UPDATE_PROFILE_DEACTIAVATE_END]: updateProfileDeactivateEnd,
	[TYPES.UPDATE_PROFILE_DEACTIAVATE_ERROR]: updateProfileDeactivateError,
	[TYPES.UPDATE_PROFILE_THEME_START]: updateProfileThemeStart,
	[TYPES.UPDATE_PROFILE_THEME_END]: updateProfileThemeEnd,
	[TYPES.UPDATE_PROFILE_THEME_ERROR]: updateProfileThemeError,
};
