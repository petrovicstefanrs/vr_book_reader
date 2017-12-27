const ENV = {
	api: {
		base_url: 'http://localhost:8000/',
		session_cookie: 'session',
		auth_header: 'Bearer'
	},

	log: {
		enabled: true,
		contexts: {
			action: false,
			reducer: false,
			api: false,
			store: false,
		}
	},
};

export default ENV;