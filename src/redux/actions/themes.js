import * as api from '../../lib/api';
import * as TYPES from '../types';
import {withType} from '../../lib/util';

export const getThemes = () => (dispatch, getState, container) => {
	dispatch(withType(TYPES.GET_THEMES_START));

	return api
		.getThemes(container.http)
		.then(data => {
			dispatch(
				withType(TYPES.GET_THEMES_END, {
					error: null,
					data: data,
				})
			);
		})
		.catch(error => {
			dispatch(withType(TYPES.GET_THEMES_ERROR, {error: error, data: null}));
		});
};

