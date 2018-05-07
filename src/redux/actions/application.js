import ENV from "../../env";
import * as TYPES from "../types";
import { withType } from "../../lib/util";
import { loginWithToken } from "./auth";

export const initialize = () => (dispatch, getState, container) => {
  dispatch(withType(TYPES.INITIALIZE_START));
  const token = container.cookie.get(ENV.api.session_cookie);
  if (!token) {
    dispatch(withType(TYPES.INITIALIZE_END));
    return Promise.resolve();
  }

  return dispatch(loginWithToken(token));
};
