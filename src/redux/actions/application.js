import lodash from 'lodash';

import ENV from '../../env';
import * as TYPES from '../types';
import {withType} from '../../lib/util';
import {loginWithToken} from './auth';
import {Toast} from '../../consts/toasts';
import {getThemes} from './themes';
import { getUser } from './profile';

export const initialize = () => (dispatch, getState, container) => {
	dispatch(withType(TYPES.INITIALIZE_START));
	const token = container.cookie.get(ENV.api.session_cookie);
	if (!token) {
		dispatch(withType(TYPES.INITIALIZE_END));
		return Promise.resolve();
	}

	dispatch(loginWithToken(token));
	dispatch(getUser(token));
	dispatch(getThemes(token));
};

export const dismissToast = id => {
	return withType(TYPES.TOAST_DISMISS, {id});
};

export const addToast = toast => {
	if (lodash.isString(toast)) {
		toast = new Toast(toast);
	}
	return withType(TYPES.TOAST_ADD, {toast});
};
