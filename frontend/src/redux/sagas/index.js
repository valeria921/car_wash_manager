import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { skillsSaga } from "./skillsSaga";
import { workersSaga } from "./workersSaga";
import { servicesSaga } from "./servicesSaga";

export default function* rootSaga() {
    yield all([
        // call(childSaga),
        ...authSaga,
        ...skillsSaga,
        ...workersSaga,
        ...servicesSaga,
    ]);
}
