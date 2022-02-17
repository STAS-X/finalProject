const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const OPERATION_KEY = "jwt-operation";
const USERID_TOKEN = "jwt-user-id";

export function setToken({
    refreshToken,
    idToken,
    localId,
    expiresIn = 3600,
    operation
}) {
    const expireDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_TOKEN, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expireDate);
    localStorage.setItem(OPERATION_KEY, operation);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERID_TOKEN);
}

export function removeAuthData() {
    localStorage.removeItem(USERID_TOKEN);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(OPERATION_KEY);
}

const localStorageService = {
    setToken,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData
};

export default localStorageService;
