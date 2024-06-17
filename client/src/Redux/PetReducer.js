import test2 from '../../public/test2.png';
const petInitialState = {
    currentPet: {
        "owner": 2,
        "name": "Banana",
        "color": "Black",
        "size": "Big",
        "gender": "Male",
        "neutering": true,
        "medical_records": "None",
        "picture": test2,
        "description": "lovely",
        "breed": "Labrador",
        "species": "Dog"
    },
    messages: [],
    currentMessages: [{
            "id": 1,
            "from_user_id": 1,
            "to_user_id": 2,
            "msg": "Hi Tim, How are you?",
          },
          {
            key: 2,
            "from_user_id": 2,
            "to_user_id": 1,
            "msg": "I am fine.",
          },
          {
            key: 3,
            "from_user_id": 1,
            "to_user_id": 2,
            "msg": "What about you?",
          },
          {
            key: 4,
            "from_user_id": 2,
            "to_user_id": 1,
            "msg": "Awesome these days.",
          },
          {
            key: 5,
            "from_user_id": 1,
            "to_user_id": 2,
            "msg": "Finally. What's the plan?",
          },
          {
            key: 6,
            "from_user_id": 2,
            "to_user_id": 1,
            "msg": "what plan mate?",
          },
          {
            key: 7,
            "from_user_id": 1,
            "to_user_id": 2,
            "msg": "I'm taliking about the tutorial",
          }],
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
