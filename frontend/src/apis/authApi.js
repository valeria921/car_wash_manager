import axiosInstance from "./axiosInstance";

export function login(email, password) {
    return axiosInstance.post("token/", {
        email,
        password,
    });
}
