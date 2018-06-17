const ENV = {
	api: {
		// base_url: 'http://localhost:8090/',
		base_url: process.env.REACT_APP_API_URL
			? process.env.REACT_APP_API_URL
			: 'http://api.stefan-mac.office.c-code.com/',
		session_cookie: 'session',
		auth_header: 'Bearer',
	},

	log: {
		enabled: true,
		contexts: {
			action: false,
			reducer: false,
			api: false,
			store: false,
		},
	},

	isDevEnv: process.env.NODE_ENV === 'development'
};

export default ENV;
