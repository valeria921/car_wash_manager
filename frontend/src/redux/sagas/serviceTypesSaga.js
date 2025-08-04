import { takeLatest, call, put } from "redux-saga/effects";
import { $, serviceTypesActions } from "../actions/index";
import { servicesApi } from "../../apis";

function* getServiceTypes() {
    try {
        const response = yield call(servicesApi.fetchServiceTypes);
        yield put(serviceTypesActions.getServiceTypesCompleted(response.data));
    } catch (e) {
        console.log(e);
    }
}

function* updateServiceType(action) {
    try {
        const response = yield call(servicesApi.updateServiceType, action.payload);
        yield put(serviceTypesActions.getServiceTypes());
    } catch (e) {}
}

function* createServiceType(action) {
    try {
        const response = yield call(servicesApi.createServiceType, action.payload);
        yield put(serviceTypesActions.getServiceTypes());
    } catch (e) {}
}

function* deleteServiceType(action) {
    try {
        const response = yield call(servicesApi.deleteServiceType, action.payload);
        yield put(serviceTypesActions.getServiceTypes());
    } catch (e) {}
}

export const serviceTypesSaga = [
    takeLatest($.GET_SERVICE_TYPES, getServiceTypes),
    takeLatest($.UPDATE_SERVICE_TYPE, updateServiceType),
    takeLatest($.CREATE_SERVICE_TYPE, createServiceType),
    takeLatest($.DELETE_SERVICE_TYPE, deleteServiceType),
];
