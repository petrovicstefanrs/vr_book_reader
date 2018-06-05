import * as api from '../../lib/api';
import * as TYPES from '../types';
import {withType} from '../../lib/util';

export const getEnvironments = () => (dispatch, getState, container) => {
	dispatch(withType(TYPES.GET_ENVIRONMENTS_START));

	return api
		.getEnvironments(container.http)
		.then(data => {
			dispatch(
				withType(TYPES.GET_ENVIRONMENTS_END, {
					error: null,
					data: data,
				})
			);
		})
		.catch(error => {
			dispatch(withType(TYPES.GET_ENVIRONMENTS_ERROR, {error: error, data: null}));
		});
};

export const getEnvironment = envId => (dispatch, getState, container) => {
	dispatch(withType(TYPES.GET_ENVIRONMENT_BY_ID_START));

	return api
		.getEnvironmentById(container.http, envId)
		.then(data => {
			dispatch(
				withType(TYPES.GET_ENVIRONMENT_BY_ID_END, {
					error: null,
					data: data,
				})
			);
		})
		.catch(error => {
			dispatch(withType(TYPES.GET_ENVIRONMENT_BY_ID_ERROR, {error: error, data: null}));
		});
};
