import * as TYPES from '../types';

const INITIAL_STATE = {
	books: {
		all_books: [],
		loading: false,
		active_book: null,
		error: null,
	},
};

const getBooksStart = (state, action) => {
	return Object.assign({}, state, {
		books: Object.assign({}, state.books, {error: null, loading: true}),
	});
};

const getBooksEnd = (state, action) => {
	return Object.assign({}, state, {
		books: Object.assign({}, state.books, {all_books: action.data, loading: false}),
	});
};

const getBooksError = (state, action) => {
	return Object.assign({}, state, {
		books: Object.assign({}, state.books, {error: action.error, loading: false}),
	});
};

const favouriteBooksStart = (state, action) => {
	return Object.assign({}, state, {
		books: Object.assign({}, state.books, {error: null}),
	});
};

const favouriteBooksEnd = (state, action) => {
	return Object.assign({}, state, {
		books: Object.assign({}, state.books, {error: null}),
	});
};

const favouriteBooksError = (state, action) => {
	return Object.assign({}, state, {
		books: Object.assign({}, state.books, {error: action.error}),
	});
};

const deleteBooksStart = (state, action) => {
	return Object.assign({}, state, {
		books: Object.assign({}, state.books, {error: null}),
	});
};

const deleteBooksEnd = (state, action) => {
	return Object.assign({}, state, {
		books: Object.assign({}, state.books, {error: null}),
	});
};

const deleteBooksError = (state, action) => {
	return Object.assign({}, state, {
		books: Object.assign({}, state.books, {error: action.error}),
	});
};

export default {
	INITIAL_STATE,
	[TYPES.GET_BOOKS_START]: getBooksStart,
	[TYPES.GET_BOOKS_END]: getBooksEnd,
	[TYPES.GET_BOOKS_ERROR]: getBooksError,
	[TYPES.FAVOURITE_BOOKS_START]: favouriteBooksStart,
	[TYPES.FAVOURITE_BOOKS_END]: favouriteBooksEnd,
	[TYPES.FAVOURITE_BOOKS_ERROR]: favouriteBooksError,
	[TYPES.DELETE_BOOKS_START]: deleteBooksStart,
	[TYPES.DELETE_BOOKS_END]: deleteBooksEnd,
	[TYPES.DELETE_BOOKS_ERROR]: deleteBooksError,
};
