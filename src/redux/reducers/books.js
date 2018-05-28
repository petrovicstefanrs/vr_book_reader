import * as TYPES from '../types';

const INITIAL_STATE = {
	books: {
		all_books: [],
		loading: false,
		uploading: false,
		active_book: null,
		error: null,
	},
};

const updateBooks = (state, data) => {
	return Object.assign({}, state, {
		books: Object.assign({}, state.books, data),
	});
};

// Get Books ---------------------------------------------------------------------------

const getBooksStart = (state, action) => {
	const data = {error: null, loading: true};
	return updateBooks(state, data);
};

const getBooksEnd = (state, action) => {
	const data = {all_books: action.data, loading: false};
	return updateBooks(state, data);
};

const getBooksError = (state, action) => {
	const data = {error: action.error, loading: false};
	return updateBooks(state, data);
};

// Get Book By Id -------------------------------------------------------------

const getBookByIdStart = (state, action) => {
	const data = {error: null, loading: true};
	return updateBooks(state, data);
};

const getBookByIdEnd = (state, action) => {
	const data = {all_books: [action.data], loading: false};
	return updateBooks(state, data);
};

const getBookByIdError = (state, action) => {
	const data = {error: action.error, loading: false};
	return updateBooks(state, data);
};

// Favourite Books ------------------------------------------------------------

const favouriteBooksStart = (state, action) => {
	const data = {error: null};
	return updateBooks(state, data);
};

const favouriteBooksEnd = (state, action) => {
	const data = {error: null};
	return updateBooks(state, data);
};

const favouriteBooksError = (state, action) => {
	const data = {error: action.error};
	return updateBooks(state, data);
};

// Delete Books ------------------------------------------------------------

const deleteBooksStart = (state, action) => {
	const data = {error: null};
	return updateBooks(state, data);
};

const deleteBooksEnd = (state, action) => {
	const data = {error: null};
	return updateBooks(state, data);
};

const deleteBooksError = (state, action) => {
	const data = {error: action.error};
	return updateBooks(state, data);
};

// Upload Books ------------------------------------------------------------

const uploadBooksStart = (state, action) => {
	const data = {error: null, uploading: true};
	return updateBooks(state, data);
};

const uploadBooksEnd = (state, action) => {
	const data = {error: null, uploading: false};
	return updateBooks(state, data);
};

const uploadBooksError = (state, action) => {
	const data = {error: action.error, uploading: false};
	return updateBooks(state, data);
};

// Update Thumbnail ---------------------------------------------------

const updateThumbnailStart = (state, action) => {
	const data = {error: null, uploading: true};
	return updateBooks(state, data);
};

const updateThumbnailEnd = (state, action) => {
	const data = {error: null, uploading: false};
	return updateBooks(state, data);
};

const updateThumbnailError = (state, action) => {
	const data = {error: action.error, uploading: false};
	return updateBooks(state, data);
};

// Exports ------------------------------------------------------------

export default {
	INITIAL_STATE,
	[TYPES.GET_BOOKS_START]: getBooksStart,
	[TYPES.GET_BOOKS_END]: getBooksEnd,
	[TYPES.GET_BOOKS_ERROR]: getBooksError,
	[TYPES.GET_BOOK_BY_ID_START]: getBookByIdStart,
	[TYPES.GET_BOOK_BY_ID_END]: getBookByIdEnd,
	[TYPES.GET_BOOK_BY_ID_ERROR]: getBookByIdError,
	[TYPES.FAVOURITE_BOOKS_START]: favouriteBooksStart,
	[TYPES.FAVOURITE_BOOKS_END]: favouriteBooksEnd,
	[TYPES.FAVOURITE_BOOKS_ERROR]: favouriteBooksError,
	[TYPES.DELETE_BOOKS_START]: deleteBooksStart,
	[TYPES.DELETE_BOOKS_END]: deleteBooksEnd,
	[TYPES.DELETE_BOOKS_ERROR]: deleteBooksError,
	[TYPES.UPLOAD_BOOKS_START]: uploadBooksStart,
	[TYPES.UPLOAD_BOOKS_END]: uploadBooksEnd,
	[TYPES.UPLOAD_BOOKS_ERROR]: uploadBooksError,
	[TYPES.UPDATE_BOOK_THUMBNAIL_START]: updateThumbnailStart,
	[TYPES.UPDATE_BOOK_THUMBNAIL_END]: updateThumbnailEnd,
	[TYPES.UPDATE_BOOK_THUMBNAIL_ERROR]: updateThumbnailError,
};
