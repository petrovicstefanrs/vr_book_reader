export const getAccessToken = (state) => {
	return state.auth.token;
};

export const isLoggedIn = (state) => {
	return !!(state.auth.token && state.auth.user && state.auth.loged_in);
};