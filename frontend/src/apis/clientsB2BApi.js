import { BASE_URL, STORAGE_KEYS } from "../constants";
import axiosInstance from "./axiosInstance";

const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
});

export const fetchClientsB2B = () => {
        return axiosInstance.get(BASE_URL + "clientsb2b", {
            headers: authHeaders(),
        });
    },
    deleteClientB2B = (clientB2BId) => {
        return axiosInstance.delete(`${BASE_URL}clientsb2b/${clientB2BId}/`, {
            headers: authHeaders(),
        });
    },
    createClientB2B = (clientB2BData) => {
        return axiosInstance.post(`${BASE_URL}clientsb2b/`, clientB2BData, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    },
    updateClientB2B = (clientB2B) => {
        return axiosInstance.put(`${BASE_URL}clientsb2b/${clientb2b.id}/`, worker, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    };
