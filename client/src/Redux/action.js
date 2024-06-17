export const loginSuccess = (user) => ({
    type: 'LOGIN',
    payload: user
});

export const signupSuccess = (user) => ({
    type: 'SIGNUP',
    payload: user,
})

export const updateUser = (user) => ({
    type: 'UPDATE',
    payload: user,
})

export const logout = () => ({
    type: 'LOGOUT',
})

export const setAuthView = (view) => ({
    type: 'SET_AUTH_VIEW',
    payload: view
});

export const setCurrentPet = (pet) => ({
    type: 'SET_CURRENT_PET',
    payload: pet
});

export const fetchMessages = (userId) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/messages?userId=${userId}`)
        .then(response => response.json())
        .then(messages => {
            dispatch({
                type: 'SET_CURRENT_MESSAGES',
                payload: messages
            });
        })
        .catch(error => console.error('Fetch messages failed:', error));
    };
};

export const toggleChatContentVisibility = () => ({
    type: 'TOGGLE_CHAT_CONTENT'
});

export const toggleUserProfileVisibility = () => ({
    type: 'TOGGLE_USER_PROFILE'
});