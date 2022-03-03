import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: null,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true;
        },
        professionRecived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionReducer, actions } = professionSlice;
const { professionRequested, professionRecived, professionRequestFailed } =
    actions;

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) return true;
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (lastFetch && !isOutDated(lastFetch)) return;
    // console.log(isOutDated(lastFetch));
    dispatch(professionRequested());
    try {
        const { content } = await professionService.fetchAll();
        dispatch(professionRecived(content));
    } catch (error) {
        dispatch(professionRequestFailed(error.message));
    }
};

export const getProfessionList = () => (state) => {
    return state.professions.entities;
};
export const getProfessionLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionByIds = (professionIds) => (state) => {
    if (state.professions.entities) {
        const professionsArray = [];
        for (const profId of professionIds) {
            for (const profession of state.professions.entities) {
                if (profession._id === profId) {
                    professionsArray.push(profession);
                    break;
                }
            }
        }
        return professionsArray;
    }
};
export default professionReducer;
