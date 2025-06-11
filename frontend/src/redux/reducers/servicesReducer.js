import { $ } from "../actions/index";

const initialState = {
    services: [],
};

const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case $.GET_SERVICES_COMPLETED: {
            return {
                ...state,
                services: action.payload,
            };
        }
        default:
            return state;
    }
};

export default servicesReducer;
