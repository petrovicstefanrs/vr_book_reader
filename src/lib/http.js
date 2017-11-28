import axios from 'axios';

import ENV from '../env';
import store from '../store';

// import {log, warn} from './logger';
import {detectIE} from './util';

export const getApiEndpoint = (url) => (ENV.api.base_url + url);

export const getHeaders = (method, onlyAuth = false) => {
	let headers = {
		// TODO: Turn this into service, inject token provider into it (no singletons)
		[ENV.api.auth_header]: store.getState().token || undefined
	};
	if (onlyAuth) {
		return headers;
	}
	if (method === 'post' || method === 'put') {
		headers['Content-Type'] = 'application/json';
	}

	// Deal with IE aggressive caching
	// http://stackoverflow.com/questions/2848945/prevent-ie-caching
	if (detectIE() && method === 'get' ) {
		headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
		headers['Pragma'] = 'no-cache';
		headers['Expires'] = '0';
	}
	return headers;
};

export const request = opts => {
	if (!opts.url) {
		throw new Error('url is required');
	}

	opts.baseURL = ENV.api.base_url;
	opts.method = opts.method || 'get';

	opts.headers = getHeaders(opts.method);

	console.log('api', `${opts.method.toUpperCase()} ${opts.url} ${opts.params ? JSON.stringify(opts.params) : ''} ==>`, opts.data);

	return axios(opts)
		.then(res => {
			console.log('api', `${opts.method.toUpperCase()} ${opts.url} <==`, res);
			return res.data;
		})
		.catch(res => {
			let err = null;
			let response = res.response;
			if (response && response.data && response.data.error) {
				err = response.data.error;
			}
			else if (response) {
				err = new Error(response.statusText);
				err.status = response.status;
			}
			else {
				err = new Error(res.message || 'HTTP Error');
				err.status = 0;
			}

			console.log('api', `${opts.method.toUpperCase()} ${opts.url}`, err, res); //warn
			err._logged = true;

			throw err;
		});
};

export const get = (url, params) => request({ url, params });

export const post = (url, params, data) => request({method: 'post', url, params, data});

export const put = (url, params, data) => request({method: 'put', url, params, data});

export const del = (url, params, data) => request({method: 'delete', url, params, data});

export const head = (url, params) => request({method: 'head', url, params});