import * as $ from "./actionTypes";

export function getServiceTypes() {
    return {
        type: $.GET_SERVICE_TYPES,
    };
}

export function getServiceTypesCompleted(serviceTypes) {
    return {
        type: $.GET_SERVICE_TYPES_COMPLETED,
        payload: serviceTypes,
    };
}

export function updateServiceType(data) {
    return {
        type: $.UPDATE_SERVICE_TYPE,
        payload: data,
    };
}

export function createServiceType(data) {
    return {
        type: $.CREATE_SERVICE_TYPE,
        payload: data,
    };
}

export function deleteServiceType(serviceTypeId) {
    return {
        type: $.DELETE_SERVICE_TYPE,
        payload: serviceTypeId,
    };
}
