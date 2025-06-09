import axios from "axios";
import { BASE_URL, STORAGE_KEYS } from "../constants";

const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
});

export const fetchServices = () => {
        return axios.get(BASE_URL + "services/", {
            headers: authHeaders(),
        });
    },
    deleteService = (serviceId) => {
        console.log(serviceId);
        return axios.delete(`${BASE_URL}services/${serviceId}/`, {
            headers: authHeaders(),
        });
    },
    fetchServiceTypes = () => {
        return axios.get(BASE_URL + "service_types/", {
            headers: authHeaders(),
        });
    },
    createService = (serviceData) => {
        return axios.post(`${BASE_URL}services/`, serviceData, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    },
    updateService = (service) => {
        return axios.put(`${BASE_URL}services/${service.id}/`, service, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    };
