import * as $ from "./actionTypes";

export function getServices() {
    return {
        type: $.GET_SERVICES,
    };
}

export function getServicesCompleted(services) {
    return {
        type: $.GET_SERVICES_COMPLETED,
        payload: services,
    };
}

export function updateService(data) {
    return {
        type: $.UPDATE_SERVICE,
        payload: data,
    };
}

export function createService(data) {
    return {
        type: $.CREATE_SERVICE,
        payload: data,
    };
}

export function deleteService(serviceId) {
    return {
        type: $.DELETE_SERVICE,
        payload: serviceId,
    };
}
