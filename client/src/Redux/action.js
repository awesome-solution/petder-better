export const loginSuccess = (user) => ({
    type: 'LOGIN',
    payload: user
});

export const signupSuccess = (user) => ({
    type: 'SIGNUP',
    payload: user,
})

export const logout = () => ({
    type: 'LOGOUT',
})

export const setAuthView = (view) => ({
    type: 'SET_AUTH_VIEW',
    payload: view
});