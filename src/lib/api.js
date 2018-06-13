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

export const updateBookEnvironment = (http, payload) => {
	return http.put('/api/books/environment', null, payload);
};

//**********************************************************************************************************************
// Environments

export const getEnvironments = http => {
	return http.get('/api/environments', null, null);
};

export const getEnvironmentById = (http, envId) => {
	return http.get('/api/environments/'+envId, null, null);
};

//**********************************************************************************************************************
// Profile

export const getUser = (http) => {
	return http.get('/api/users/me', null, null);
};

export const updateUserAvatar = (http, file, userId) => {
	const data = new FormData();
	data.append(file.name, file);
	data.append('userId', userId);
	return http.post('/api/users/upload/avatar', null, data);
};

export const updateProfileDetails = (http, payload) => {
	return http.put('/api/users/me/details', null, payload);
};

export const updateProfilePassword = (http, password) => {
	return http.post('/api/users/me/changepass', null, {password});
};

export const updateProfileDeactivate = (http) => {
	return http.put('/api/users/me/deactivate', null, null);
};

export const updateProfileTheme = (http, themeId) => {
	return http.put('/api/users/me/uitheme', null, {themeId});
};

//**********************************************************************************************************************
// Themes

export const getThemes = (http) => {
	return http.get('/api/themes', null, null);
};
