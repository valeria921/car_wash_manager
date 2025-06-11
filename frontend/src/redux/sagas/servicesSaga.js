import { takeLatest, call, put } from "redux-saga/effects";
import { $, servicesActions } from "../actions/index";
import { servicesApi } from "../../apis";

function* getServices() {
    try {
        const response = yield call(servicesApi.fetchServices);
        console.log(response.data);
        yield put(servicesActions.getServicesCompleted(response.data));
    } catch (e) {}
}

function* updateService(action) {
    try {
        const response = yield call(servicesApi.updateService, action.payload);
        console.log(response.data);
        yield put(servicesActions.getServices());
    } catch (e) {}
}

function* createService(action) {
    try {
        const response = yield call(servicesApi.createService, action.payload);
        console.log(response.data);
        yield put(servicesActions.getServices());
    } catch (e) {}
}

function* deleteService(action) {
    try {
        const response = yield call(servicesApi.deleteService, action.payload);
        console.log(response.data);
        yield put(servicesActions.getServices());
    } catch (e) {}
}

export const servicesSaga = [
    takeLatest($.GET_SERVICES, getServices),
    takeLatest($.UPDATE_SERVICE, updateService),
    takeLatest($.CREATE_SERVICE, createService),
    takeLatest($.DELETE_SERVICE, deleteService),
];
