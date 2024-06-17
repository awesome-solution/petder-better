const petInitialState = {
    pets: [],
    currentPet: null,
    messages: [],
    currentMessages: [],
    showChatContent: false,
    showUserProfile: false
};

const petReducer = (state = petInitialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_PET':
            return {
                ...state,
                currentPet: action.payload
            };
        case 'SET_CURRENT_MESSAGES':
            return {
                ...state,
                currentMessages: action.payload
            };
        case 'TOGGLE_CHAT_CONTENT':
            return {
                ...state,
                showChatContent: !state.showChatContent
            };
        case 'TOGGLE_USER_PROFILE':
            return {
                ...state,
                showUserProfile: !state.showUserProfile
            };
        default:
            return state;
    }
};

export default petReducer;
