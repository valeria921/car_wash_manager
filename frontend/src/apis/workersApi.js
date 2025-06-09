import axios from "axios";
import { BASE_URL, STORAGE_KEYS } from "../constants";

export const fetchWorkers = () => {
    return axios.get(BASE_URL + "workers", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
        },
    });
};

export const deleteWorker = (workerId) => {
    return axios.delete(`${BASE_URL}workers/${workerId}/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
        },
    });
};
