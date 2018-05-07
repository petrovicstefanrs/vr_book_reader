import * as TYPES from "../types";

const INITIAL_STATE = {
  initialized: false,
  fatalError: null,
  loading: false
};

const initializeStart = state => {
  return Object.assign({}, state, {
    loading: true,
    initialized: false,
    fatalError: null
  });
};

const initializeErr = (state, action) => {
  return Object.assign({}, state, {
    loading: true,
    fatalError: action.error
  });
};

const initializeEnd = state => {
  return Object.assign({}, state, {
    loading: false,
    initialized: true,
    fatalError: null
  });
};

export default {
  INITIAL_STATE,
  [TYPES.INITIALIZE_START]: initializeStart,
  [TYPES.INITIALIZE_END]: initializeEnd,
  [TYPES.INITIALIZE_ERROR]: initializeErr
};
