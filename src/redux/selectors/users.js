export const getUser = state => {
  return state.auth.user ? state.auth.user : null;
};
