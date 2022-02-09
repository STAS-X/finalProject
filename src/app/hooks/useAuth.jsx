import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import localStorageService from "../services/localStorage.service";
import axios from "axios";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);
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
            await createUser({ _id: data.localId, email, ...rest });
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
            await getAccountUser({ _id: data.localId });
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
                        errorObject.email = "Пароль указан неверно";
                        break;
                    case "USER_DISABLED":
                        errorObject.email = "Пароль указан неверно";
                        break;
                }
                throw errorObject;
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function getAccountUser(data) {
        try {
            const { content } = userService.get(data._id);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data.error;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
            {children}
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
