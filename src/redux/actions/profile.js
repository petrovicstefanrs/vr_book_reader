import * as api from '../../lib/api';
import * as TYPES from '../types';
import {withType} from '../../lib/util';
import {addToast} from './application';
import {Toast} from '../../consts/toasts';
import {logout} from './auth';

export const getUser = () => (dispatch, getState, container) => {
	dispatch(withType(TYPES.GET_USER_START));

	return api
		.getUser(container.http)
		.then(data => {
			dispatch(
				withType(TYPES.GET_USER_END, {
					error: null,
					data: data,
				})
			);
			data && localStorage.setItem('selectedTheme', data.uiThemeId || null);
		})
		.catch(error => {
			dispatch(withType(TYPES.GET_USER_ERROR, {error: error, data: null}));
		});
};

export const updateUserAvatar = (file, userId) => (dispatch, getState, container) => {
	dispatch(withType(TYPES.UPDATE_USER_AVATAR_START));

	return api
		.updateUserAvatar(container.http, file, userId)
		.then(data => {
			dispatch(
				withType(TYPES.UPDATE_USER_AVATAR_END, {
					error: null,
					data: data,
				})
			);
			dispatch(getUser());
			const message = `Your avatar was successfully updated.`;
			dispatch(addToast(new Toast(message)));
		})
		.catch(error => {
			const message = `Error: ${error ? error.message : 'Undefined'}`;
			dispatch(addToast(new Toast(message)));
			dispatch(withType(TYPES.UPDATE_USER_AVATAR_ERROR, {error: error, data: null}));
		});
};

export const updateProfileDetails = payload => (dispatch, getState, container) => {
	dispatch(withType(TYPES.UPDATE_PROFILE_DETAILS_START));
	return api
		.updateProfileDetails(container.http, payload)
		.then(data => {
			dispatch(
				withType(TYPES.UPDATE_PROFILE_DETAILS_END, {
					error: null,
					data: data,
				})
			);
			dispatch(getUser());
			const message = `Your profile was successfully updated.`;
			dispatch(addToast(new Toast(message)));
		})
		.catch(error => {
			const message = `Error: ${error ? error.message : 'Undefined'}`;
			dispatch(addToast(new Toast(message)));
			dispatch(withType(TYPES.UPDATE_PROFILE_DETAILS_ERROR, {error: error, data: null}));
		});
};

export const updateProfilePassword = password => (dispatch, getState, container) => {
	dispatch(withType(TYPES.UPDATE_PROFILE_PASSWORD_START));
	return api
		.updateProfilePassword(container.http, password)
		.then(data => {
			dispatch(
				withType(TYPES.UPDATE_PROFILE_PASSWORD_END, {
					error: null,
					data: data,
				})
			);
			dispatch(getUser());
			const message = `Your password was successfully updated.`;
			dispatch(addToast(new Toast(message)));
		})
		.catch(error => {
			const message = `Error: ${error ? error.message : 'Undefined'}`;
			dispatch(addToast(new Toast(message)));
			dispatch(withType(TYPES.UPDATE_PROFILE_PASSWORD_ERROR, {error: error, data: null}));
		});
};

export const updateProfileDeactivate = () => (dispatch, getState, container) => {
	dispatch(withType(TYPES.UPDATE_PROFILE_DEACTIAVATE_START));
	return api
		.updateProfileDeactivate(container.http)
		.then(data => {
			dispatch(
				withType(TYPES.UPDATE_PROFILE_DEACTIAVATE_END, {
					error: null,
					data: data,
				})
			);
			dispatch(logout());
			const message = `Your profile was successfully deactivated. To reactivate your account contact our support.`;
			dispatch(addToast(new Toast(message)));
		})
		.catch(error => {
			const message = `Error: ${error ? error.message : 'Undefined'}`;
			dispatch(addToast(new Toast(message)));
			dispatch(withType(TYPES.UPDATE_PROFILE_DEACTIAVATE_ERROR, {error: error, data: null}));
		});
};

export const updateProfileTheme = themeId => (dispatch, getState, container) => {
	dispatch(withType(TYPES.UPDATE_PROFILE_THEME_START));
	return api
		.updateProfileTheme(container.http, themeId)
		.then(data => {
			dispatch(
				withType(TYPES.UPDATE_PROFILE_THEME_END, {
					error: null,
					data: data,
				})
			);
			dispatch(getUser());
			localStorage.setItem('selectedTheme', themeId);
			const message = `UI Theme was successfully changed.`;
			dispatch(addToast(new Toast(message)));
		})
		.catch(error => {
			const message = `Error: ${error ? error.message : 'Undefined'}`;
			dispatch(addToast(new Toast(message)));
			dispatch(withType(TYPES.UPDATE_PROFILE_THEME_ERROR, {error: error, data: null}));
		});
};
