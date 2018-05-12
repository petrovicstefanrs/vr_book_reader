import * as api from '../../lib/api';
import * as TYPES from '../types';
import {withType} from '../../lib/util';

export const getBooks = () => (dispatch, getState, container) => {
	dispatch(withType(TYPES.GET_BOOKS_START));

	return api
		.getBooks(container.http)
		.then(data => {
			dispatch(
				withType(TYPES.GET_BOOKS_END, {
					error: null,
					data: data,
				})
			);
		})
		.catch(error => {
			dispatch(withType(TYPES.GET_BOOKS_ERROR, {error: error, data: null}));
		});
};
