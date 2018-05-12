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

export default {
	INITIAL_STATE,
	[TYPES.GET_BOOKS_START]: getBooksStart,
	[TYPES.GET_BOOKS_END]: getBooksEnd,
	[TYPES.GET_BOOKS_ERROR]: getBooksError,
};
