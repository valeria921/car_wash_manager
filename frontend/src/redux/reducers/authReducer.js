import { $ } from "../actions/index";
import { STORAGE_KEYS } from "../../constants";

const initialState = {
    accessToken: "",
    refreshToken: "",
    email: "",
    role: "",
    userId: 0,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case $.LOGIN_COMPLETED: {
            console.log("3 - DATA RECEIVED INSIDE REDUCER");
            console.log(action);

            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, action.payload.accessToken);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, action.payload.refreshToken);
            localStorage.setItem(STORAGE_KEYS.USER_ID, action.payload.userId);
            localStorage.setItem(STORAGE_KEYS.ROLE, action.payload.role);

            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                email: action.payload.email,
                role: action.payload.role,
                userId: action.payload.userId,
            };
        }
        case $.LOGOUT: {
            console.log("2 - LOGOUT COMPLETED");

            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_ID);
            localStorage.removeItem(STORAGE_KEYS.ROLE);

            return {
                ...initialState,
            };
        }
        case $.SET_TOKENS:{
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        }
        default:
            return state;
    }
};

export default authReducer;
