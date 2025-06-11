import { takeLatest, call, put } from "redux-saga/effects";
import { $, authActions } from "../actions/index";
import { authApi } from "../../apis";

function* login(action) {
    try {
        const email = action.payload.email;
        const password = action.payload.password;

        console.log("1 - LOGIN INSIDE SAGA STARTED");

        const response = yield call(authApi.login, email, password);
        const data = response.data;
        console.log("2 - LOGIN DONE, SENDING DATA TO REDUCER");

        yield put(
            authActions.loginCompleted(
                data.access,
                data.refresh,
                data.email,
                data.role,
                data.user_id,
            ),
        );
    } catch (e) {
        console.log(e);
        let errorList = "";
        Object.keys(e.response.data).forEach((key) => {
            const value = e.response.data[key];
            errorList += " " + value;
        });
        alert("Login failed: " + (errorList || "Unknown error"));
    }
}

export const authSaga = [takeLatest($.LOGIN, login)];
