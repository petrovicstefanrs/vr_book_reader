export const healthCheck = (http) => {
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

export const logout = (http) => {
	return http.post('/auth/signout', null, {});
};

export const register = (http, email, password, username) => {
	return http.post('/auth/signup', null, {email: email, password: password, username: username});
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
