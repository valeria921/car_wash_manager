import axiosInstance from "./axiosInstance";
import { BASE_URL, STORAGE_KEYS } from "../constants";

const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
});

export const fetchServices = () => {
        return axiosInstance.get(BASE_URL + "services/", {
            headers: authHeaders(),
        });
    },
    deleteService = (serviceId) => {
        console.log(serviceId);
        return axiosInstance.delete(`${BASE_URL}services/${serviceId}/`, {
            headers: authHeaders(),
        });
    },
    createService = (serviceData) => {
        return axiosInstance.post(`${BASE_URL}services/`, serviceData, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    },
    updateService = (service) => {
        return axiosInstance.put(`${BASE_URL}services/${service.id}/`, service, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    },
    fetchServiceTypes = () => {
        return axiosInstance.get(BASE_URL + "service_types/", {
            headers: authHeaders(),
        });
    },
    deleteServiceType = (serviceTypeId) => {
        console.log(serviceTypeId);
        return axiosInstance.delete(`${BASE_URL}service_types/${serviceTypeId}/`, {
            headers: authHeaders(),
        });
    },
    createServiceType = (serviceTypeData) => {
        return axiosInstance.post(`${BASE_URL}service_types/`, serviceTypeData, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    },
    updateServiceType = (serviceType) => {
        return axiosInstance.put(`${BASE_URL}service_types/${serviceType.id}/`, serviceType, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    };
