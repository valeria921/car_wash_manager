import { takeLatest, call, put } from "redux-saga/effects";
import { $, workersActions } from "../actions/index";
import { workersApi } from "../../apis";

function* getWorkers() {
    try {
        const response = yield call(workersApi.fetchWorkers);
        console.log(response.data);
        yield put(workersActions.getWorkersCompleted(response.data));
    } catch (e) {
        console.log("eeee");
    }
}

function* updateWorker(action) {
    try {
        const response = yield call(workersApi.updateWorker, action.payload);
        console.log(response.data);
        yield put(workersActions.getWorkers());
    } catch (e) {
        console.log("eeee");
    }
}

function* createWorker(action) {
    try {
        const response = yield call(workersApi.createWorker, action.payload);
        console.log(response.data);
        yield put(workersActions.getWorkers());
    } catch (e) {}
}

function* deleteWorker(action) {
    try {
        const response = yield call(workersApi.deleteWorker, action.payload);
        console.log(response.data);
        yield put(workersActions.getWorkers());
    } catch (e) {}
}

export const workersSaga = [
    takeLatest($.GET_WORKERS, getWorkers),
    takeLatest($.UPDATE_WORKER, updateWorker),
    takeLatest($.CREATE_WORKER, createWorker),
    takeLatest($.DELETE_WORKER, deleteWorker),
];
