import authReducer from "./AuthReducer";
import petReducer from "./PetReducer";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        auth: authReducer,
        pets: petReducer,
    }
});

export default store;