import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import localStorageService from "../services/localStorage.service";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useUser } from "./useUsers";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const { getUsers } = useUser();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function updateNavBar() {
        try {
            await getUsers();
            await getUserData();
        } finally {
            // console.log(currentUser);
        }
    }

    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setToken({
                ...data,
                operation: "REGISTER"
            });
            await createUser({
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
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400 && message === "EMAIL_EXISTS") {
                const errorObject = {
                    email: "Пользователь с таким Email уже существует"
                };
                // console.log("error occured", errorObject);
                throw errorObject;
            }
        }
    }

    async function logIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setToken({
                ...data,
                operation: "AUTH"
            });
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorObject = {
                    email: `При попытке регистрации произошла ошибка: ${message}`
                };
                switch (message) {
                    case "EMAIL_NOT_FOUND":
                        errorObject.email =
                            "Пользователь с таким Email не найден";
                        break;
                    case "INVALID_PASSWORD":
                        errorObject.password = "Пароль указан неверно";
                        break;
                    case "USER_DISABLED":
                        errorObject.email = "Пользователь заблокирован в БД";
                        break;
                }
                throw errorObject;
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            // console.log(content, "CreateUser");
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
            return content;
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data.error;
        setError(message);
    }

    useEffect(async () => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else setLoading(false);
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider
            value={{
                signUp,
                logIn,
                logOut,
                getUserData,
                updateNavBar,
                currentUser
            }}
        >
            {" "}
            {!isLoading ? children : <h1>Loading...</h1>}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
