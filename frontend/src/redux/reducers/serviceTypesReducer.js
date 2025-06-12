import { $ } from "../actions/index";

const initialState = {
    serviceTypes: [],
};

const serviceTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case $.GET_SERVICE_TYPES_COMPLETED: {
            return {
                ...state,
                serviceTypes: action.payload,
            };
        }
        default:
            return state;
    }
};

export default serviceTypesReducer;
