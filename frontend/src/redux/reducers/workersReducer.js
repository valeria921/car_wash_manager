import { $ } from "../actions/index";

const initialState = {
    workers: [],
};

const workersReducer = (state = initialState, action) => {
    switch (action.type) {
        case $.GET_WORKERS_COMPLETED: {
            return {
                ...state,
                workers: action.payload,
            };
        }
        default:
            return state;
    }
};

export default workersReducer;
