import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { skillsSaga } from "./skillsSaga";
import { workersSaga } from "./workersSaga";
import { servicesSaga } from "./servicesSaga";
import { serviceTypesSaga } from "./serviceTypesSaga";

export default function* rootSaga() {
    yield all([...authSaga, ...skillsSaga, ...workersSaga, ...servicesSaga, ...serviceTypesSaga]);
}
