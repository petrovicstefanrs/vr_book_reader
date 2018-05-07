import axios from "axios";

import ENV from "../env";
import { store } from "../store";

import { log, warn } from "./logger";
import { detectIE } from "./util";
import { getAccessToken } from "../redux/selectors/auth";

export const getApiEndpoint = url => ENV.api.base_url + url;

export const getHeaders = (method, onlyAuth = false) => {
  let headers = {
    Authorization:
      ENV.api.auth_header + " " + getAccessToken(store.getState()) || undefined
  };
  if (onlyAuth) {
    return headers;
  }
  if (method === "post" || method === "put") {
    headers["Content-Type"] = "application/json";
  }

  // Deal with IE aggressive caching
  if (detectIE() && method === "get") {
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Pragma"] = "no-cache";
    headers["Expires"] = "0";
  }
  return headers;
};

export const request = options => {
  if (!options.url) {
    throw new Error("url is required");
  }

  options.baseURL = ENV.api.base_url;
  options.method = options.method || "get";

  options.headers = getHeaders(options.method);

  log(
    "api",
    `${options.method.toUpperCase()} ${options.url} ${
      options.params ? JSON.stringify(options.params) : ""
    } ==>`,
    options.data
  );

  return axios(options)
    .then(res => {
      log("api", `${options.method.toUpperCase()} ${options.url} <==`, res);
      return res.data;
    })
    .catch(res => {
      let err = null;
      let response = res.response;
      if (response && response.data && response.data.error) {
        err = response.data.error;
      } else if (response) {
        err = new Error(response.statusText);
        err.status = response.status;
      } else {
        err = new Error(res.message || "HTTP Error");
        err.status = 0;
      }

      warn("api", `${options.method.toUpperCase()} ${options.url}`, err, res);
      err._logged = true;

      throw err;
    });
};

export const get = (url, params) => request({ url, params });
export const post = (url, params, data) =>
  request({ method: "post", url, params, data });
export const put = (url, params, data) =>
  request({ method: "put", url, params, data });
export const del = (url, params, data) =>
  request({ method: "delete", url, params, data });
export const head = (url, params) => request({ method: "head", url, params });
