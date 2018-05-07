import ENV from "../../env";
import * as api from "../../lib/api";
import * as TYPES from "../types";
import { withType } from "../../lib/util";

export const loginWithToken = token => (dispatch, getState, container) => {
  dispatch(
    withType(TYPES.LOGIN_TOKEN_START, { error: null, data: { token: token } })
  );

  return api
    .loginWithToken(container.http, token)
    .then(data => {
      dispatch(withType(TYPES.INITIALIZE_END));

      dispatch(
        withType(TYPES.LOGIN_TOKEN_END, {
          error: null,
          data: data
        })
      );

      const state = getState();
      let authRedirect = state.auth.redirect;
      if (authRedirect) {
        dispatch(clearAuthRedirect());
        container.history.push(authRedirect);
      }
    })
    .catch(error => {
      dispatch(withType(TYPES.INITIALIZE_END));
      container.cookie.remove(ENV.api.session_cookie);
      dispatch(withType(TYPES.LOGIN_TOKEN_ERROR, { error: error, data: null }));
    });
};

export const login = (email, password) => (dispatch, getState, container) => {
  dispatch(withType(TYPES.LOGIN_START));

  return api
    .login(container.http, email, password)
    .then(data => {
      dispatch(
        withType(TYPES.LOGIN_END, {
          error: null,
          data: data
        })
      );
      container.cookie.set(ENV.api.session_cookie, data.token);
    })
    .catch(error => {
      dispatch(withType(TYPES.LOGIN_ERROR, { error: error, data: null }));
    });
};

export const register = (username, email, password) => (
  dispatch,
  getState,
  container
) => {
  dispatch(withType(TYPES.REGISTER_START));

  return api
    .register(container.http, email, password, username)
    .then(data => {
      dispatch(
        withType(TYPES.REGISTER_END, {
          data: { message: "Registration successful. You can now login." }
        })
      );
    })
    .catch(error => {
      dispatch(withType(TYPES.REGISTER_ERROR, { error: error, data: null }));
    });
};

export const clearAuthMessage = () => (dispatch, getState, container) => {
  dispatch(withType(TYPES.AUTH_CLEAR_MESSAGE));
};

export const logout = () => (dispatch, getState, container) => {
  dispatch(withType(TYPES.LOGOUT_START));
  container.cookie.remove(ENV.api.session_cookie);
  dispatch(withType(TYPES.LOGOUT_END));
};

export const setAuthRedirect = location => (dispatch, getState, container) => {
  dispatch(
    withType(TYPES.AUTH_SET_REDIRECT, {
      data: {
        pathname: location.pathname,
        query: location.query
      }
    })
  );
};

export const clearAuthRedirect = () => (dispatch, getState, container) => {
  dispatch(
    withType(TYPES.AUTH_SET_REDIRECT, {
      data: null
    })
  );
};
