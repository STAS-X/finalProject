import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import randomInt from "../utils/getRandom";
import history from "../utils/history";
import { toast } from "react-toastify";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = {
    entities: null,
    isLoading: !!localStorageService.getUserId(),
    error: null,
    auth: localStorageService.getUserId()
        ? { userId: localStorageService.getUserId() }
        : null,
    isLoggedIn: !!localStorageService.getUserId(),
    dataLoaded: false
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersRecived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            toast.error(action.payload, {
                position: "top-center"
            });
            state.error = action.payload;
        },
        authRequested: (state, action) => {
            state.error = null;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userUpdate: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            } else {
                state.entities = state.entities.map((item) => {
                    if (item._id === action.payload._id) {
                        return action.payload;
                    }
                    return item;
                });
            }
        },
        userLogOut: (state, action) => {
            toast.warning(
                `Пользователь [${
                    state.entities.find(
                        (u) =>
                            u._id ===
                            (state.auth
                                ? state.auth.userId
                                : localStorageService.getUserId())
                    ).email
                }] вышел из системы`,
                {
                    position: "top-center"
                }
            );
            state.isLoggedIn = false;
            state.auth = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersRecived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    authRequested,
    userCreated,
    userUpdate,
    userLogOut
} = actions;

// const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");

export const logIn =
    ({ payload, redirect }) =>
    async (dispatch, getState) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.logIn({ email, password });
            if (
                !getState().users.entities.find((u) => u._id === data.localId)
            ) {
                return;
            }
            dispatch(authRequestSuccess({ userId: data.localId }));
            localStorageService.setToken(data);
            toast.success(`Пользователь [${data.email}] вошел в систему`, {
                position: "top-center"
            });
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else dispatch(authRequestFailed(error.message));
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setToken(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: randomInt(1, 5),
                    completedMeetings: randomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(setUserLogoutStatus());
    history.push("/");
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(userCreateFailed(error.message));
        }
    };
}

export const loadUsersList = () => async (dispatch, getState) => {
    // console.log(isOutDated(lastFetch));
    // if (getState().users.entities && getState().users.entities.length > 0) {
    //     return;
    // }
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersRecived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const setUserLogoutStatus = () => (dispatch, getState) => {
    dispatch(userLogOut());
};

export const setUserById = (data) => (dispatch, getState) => {
    dispatch(userUpdate(data));
};

export const getUserbyId = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export const getUsersList = () => (state) => {
    return state.users.entities;
};

export const getIsLogged = () => (state) => {
    return state.users.isLoggedIn;
};

export const getDataStatus = () => (state) => state.users.dataLoaded;

export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export const getAuthUser = () => (state) => {
    if (!state.users.entities) return null;
    if (state.users.auth) {
        return state.users.entities.find(
            (u) => u._id === state.users.auth.userId
        );
    } else {
        return state.users.entities.find(
            (u) => u._id === localStorageService.getUserId()
        );
    }
};
export const getAuthError = () => (state) => {
    return state.users.error;
};
export default usersReducer;
