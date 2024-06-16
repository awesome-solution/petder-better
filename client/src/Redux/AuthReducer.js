const initialState = {
    user: null,
    authView: 'LOGIN'
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN":
        case "SIGNUP":
            return {
                ...state,
                user: action.payload,
                authView: 'LogOut'
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                authView: 'Login'
            };
        case "SET_AUTH_VIEW":
            return {
                ...state,
                authView: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;