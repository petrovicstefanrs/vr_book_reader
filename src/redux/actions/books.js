import * as api from '../../lib/api';
import * as TYPES from '../types';
import {withType} from '../../lib/util';
import {addToast} from './application';
import {Toast} from '../../consts/toasts';

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

export const toggleFavouriteBook = bookId => (dispatch, getState, container) => {
	dispatch(withType(TYPES.FAVOURITE_BOOKS_START));

	return api
		.toggleFavouriteBook(container.http, bookId)
		.then(data => {
			dispatch(
				withType(TYPES.FAVOURITE_BOOKS_END, {
					error: null,
					data: data,
				})
			);
			dispatch(getBooks());
			const message = data.isFavourite
				? `${data.name} added to favourites.`
				: `${data.name} removed from favourites.`;
			dispatch(addToast(new Toast(message)));
		})
		.catch(error => {
			dispatch(withType(TYPES.FAVOURITE_BOOKS_ERROR, {error: error, data: null}));
		});
};

export const deleteBook = bookId => (dispatch, getState, container) => {
	dispatch(withType(TYPES.DELETE_BOOKS_START));

	return api
		.deleteBook(container.http, bookId)
		.then(data => {
			dispatch(
				withType(TYPES.DELETE_BOOKS_END, {
					error: null,
					data: data,
				})
			);
			dispatch(getBooks());
			const message = data.deletedAt && `${data.name} deleted from Library.`;
			dispatch(addToast(new Toast(message)));
		})
		.catch(error => {
			dispatch(withType(TYPES.DELETE_BOOKS_ERROR, {error: error, data: null}));
		});
};
