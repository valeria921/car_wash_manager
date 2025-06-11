import * as $ from "./actionTypes";

export function getWorkers() {
    return {
        type: $.GET_WORKERS,
    };
}

export function getWorkersCompleted(workers) {
    return {
        type: $.GET_WORKERS_COMPLETED,
        payload: workers,
    };
}

export function updateWorker(data) {
    return {
        type: $.UPDATE_WORKER,
        payload: data,
    };
}

export function createWorker(data) {
    return {
        type: $.CREATE_WORKER,
        payload: data,
    };
}

export function deleteWorker(workerId) {
    return {
        type: $.DELETE_WORKER,
        payload: workerId,
    };
}
