import { combineReducers } from "redux";
import authReducer from "./authReducer";
import skillsReducer from "./skillsReducer";
import workersReducer from "./workersReducer";
import servicesReducer from "./servicesReducer";
import serviceTypesReducer from "./serviceTypesReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    skills: skillsReducer,
    workers: workersReducer,
    services: servicesReducer,
    serviceTypes: serviceTypesReducer,
});

export default rootReducer;
