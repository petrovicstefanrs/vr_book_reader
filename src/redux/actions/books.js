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

export const getBook = bookId => (dispatch, getState, container) => {
	dispatch(withType(TYPES.GET_BOOK_BY_ID_START));

	return api
		.getBookById(container.http, bookId)
		.then(data => {
			dispatch(
				withType(TYPES.GET_BOOK_BY_ID_END, {
					error: null,
					data: data,
				})
			);
		})
		.catch(error => {
			dispatch(withType(TYPES.GET_BOOK_BY_ID_ERROR, {error: error, data: null}));
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

export const uploadBook = file => (dispatch, getState, container) => {
	dispatch(withType(TYPES.UPLOAD_BOOKS_START));

	return api
		.uploadBook(container.http, file)
		.then(data => {
			dispatch(
				withType(TYPES.UPLOAD_BOOKS_END, {
					error: null,
					data: data,
				})
			);
			dispatch(getBooks());
			const message = `${data.name} successfully uploaded.`;
			dispatch(addToast(new Toast(message)));
		})
		.catch(error => {
			const message = `Error: ${error ? error.message : 'Undefined'}`;
			dispatch(addToast(new Toast(message)));
			dispatch(withType(TYPES.UPLOAD_BOOKS_ERROR, {error: error, data: null}));
		});
};

export const updateBookThumbnail = (file, bookId) => (dispatch, getState, container) => {
	dispatch(withType(TYPES.UPDATE_BOOK_THUMBNAIL_START));

	return api
		.updateBookThumbnail(container.http, file, bookId)
		.then(data => {
			dispatch(
				withType(TYPES.UPDATE_BOOK_THUMBNAIL_END, {
					error: null,
					data: data,
				})
			);
			dispatch(getBook(bookId));
			const message = `${data.name} cover successfully updated.`;
			dispatch(addToast(new Toast(message)));
		})
		.catch(error => {
			const message = `Error: ${error ? error.message : 'Undefined'}`;
			dispatch(addToast(new Toast(message)));
			dispatch(withType(TYPES.UPDATE_BOOK_THUMBNAIL_ERROR, {error: error, data: null}));
		});
};

export const updateBookDetails = (payload) => (dispatch, getState, container) => {
	dispatch(withType(TYPES.UPDATE_BOOK_DETAILS_START));
	return api
		.updateBookDetails(container.http, payload)
		.then(data => {
			dispatch(
				withType(TYPES.UPDATE_BOOK_DETAILS_END, {
					error: null,
					data: data,
				})
			);
			dispatch(getBook(payload.bookId));
			const message = `${data.name} details were successfully updated.`;
			dispatch(addToast(new Toast(message)));
		})
		.catch(error => {
			const message = `Error: ${error ? error.message : 'Undefined'}`;
			dispatch(addToast(new Toast(message)));
			dispatch(withType(TYPES.UPDATE_BOOK_DETAILS_ERROR, {error: error, data: null}));
		});
};