export const LOGIN = "@user/Login";
export const LOGOUT = "@user/Logout";

export const login = payload => ({
  type: LOGIN,
  payload
});

export const logout = payload => ({
  type: LOGOUT,
  payload
});
