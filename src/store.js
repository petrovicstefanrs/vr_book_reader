// Node Modules

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cookie from "js-cookie";
import logger from "redux-logger";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

// Enviroment settings

import * as http from "./lib/http";
import reducer from "./redux/index";

export const history = createHistory();
const routerMid = routerMiddleware(history);

const container = {
  http,
  cookie,
  history
};

export const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(container), logger, routerMid)
);
