const ENV = {
	api: {
		// base_url: 'http://172.20.10.2:8090/',
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

	isDevEnv: false
};

export default ENV;
