import axios from "axios";
import { BASE_URL, STORAGE_KEYS } from "../constants";

const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
});

export const fetchWorkers = () => {
        return axios.get(BASE_URL + "workers", {
            headers: authHeaders(),
        });
    },
    deleteWorker = (workerId) => {
        return axios.delete(`${BASE_URL}workers/${workerId}/`, {
            headers: authHeaders(),
        });
    },
    createWorker = (workerData) => {
        return axios.post(`${BASE_URL}workers/`, workerData, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    },
    updateWorker = (worker) => {
        return axios.put(`${BASE_URL}workers/${worker.id}/`, worker, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    };
