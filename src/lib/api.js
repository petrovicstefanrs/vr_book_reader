export const healthCheck = http => {
	return http.get('/health-check');
};

//**********************************************************************************************************************
// Auth

export const login = (http, email, password) => {
	return http.post('/auth/signin', null, {email, password});
};

export const loginWithToken = (http, token) => {
	return http.post('/auth/signintoken', null, {token});
};

export const logout = http => {
	return http.post('/auth/signout', null, {});
};

export const register = (http, email, password, username) => {
	return http.post('/auth/signup', null, {
		email: email,
		password: password,
		username: username,
	});
};

//**********************************************************************************************************************
// Books

export const getBooks = http => {
	return http.get('/api/books', null, null);
};

export const getBookById = (http, bookId) => {
	return http.get('/api/books/'+bookId, null, null);
};

export const toggleFavouriteBook = (http, bookId) => {
	return http.put('/api/books/favourite', null, {
		bookId,
	});
};

export const deleteBook = (http, bookId) => {
	return http.del('/api/books/delete', null, {
		bookId,
	});
};

export const uploadBook = (http, file) => {
	const data = new FormData();
	data.append(file.name, file);
	return http.post('/api/books/upload', null, data);
};

export const updateBookThumbnail = (http, file, bookId) => {
	const data = new FormData();
	data.append(file.name, file);
	data.append('bookId', bookId);
	return http.post('/api/books/upload/thumbnail', null, data);
};

export const updateBookDetails = (http, payload) => {
	return http.put('/api/books/details', null, payload);
};

//**********************************************************************************************************************
// Users

/**
 * @param http
 * @param {OrderCriteria} criteria
 * @param {PaginationInfo} fromPage
 */
// export const getUsers = (http, criteria, fromPage = null) => {
// 	const query = criteria.toQuery(fromPage);
// 	return http.get('/users', query);
// };

// export const getUser = (http, userId) => {
// 	return http.get('/users/' + userId);
// };

// export const createUser = (http, payload) => {
// 	return http.post('/users', null, payload);
// };

// export const updateUser = (http, userId, payload) => {
// 	return http.put('/users/' + userId, null, payload);
// };

// export const deleteUser = (http, userId) => {
// 	return http.del('/users/' + userId);
// };
