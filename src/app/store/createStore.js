import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionReducer from "./professions";
import usersReducer from "./users";
import commentReducer from "./comments";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionReducer,
    comments: commentReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
