import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers"; // your combined reducers
import rootSaga from "./sagas"; // the root saga

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the store with the saga middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
