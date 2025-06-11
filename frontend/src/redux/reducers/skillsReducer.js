import { $ } from "../actions/index";

const initialState = {
    skills: [],
};

const skillsReducer = (state = initialState, action) => {
    switch (action.type) {
        case $.GET_SKILLS_COMPLETED: {
            return {
                ...state,
                skills: action.payload,
            };
        }
        default:
            return state;
    }
};

export default skillsReducer;
