import * as $ from "./actionTypes";

export function login(email, password) {
    return {
        type: $.LOGIN,
        payload: {
            email,
            password,
        },
    };
}

export function loginCompleted(accessToken, refreshToken, email, role, userId) {
    return {
        type: $.LOGIN_COMPLETED,
        payload: {
            accessToken,
            refreshToken,
            email,
            role,
            userId,
        },
    };
}

export function logout() {
    return {
        type: $.LOGOUT,
    };
}
