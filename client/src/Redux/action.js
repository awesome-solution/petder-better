export const authSuccess = (user) => ({
    type: "AUTH_SUCCESS",
    payload: user,
  });
  
  export const logout = () => ({
    type: "LOGOUT",
  });
  
  export const setAuthView = (view) => ({
    type: "SET_AUTH_VIEW",
    payload: view,
  });
  