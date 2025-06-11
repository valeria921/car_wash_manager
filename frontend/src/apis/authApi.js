import axios from "axios";
import { BASE_URL, STORAGE_KEYS } from "../constants";

export function login(email, password) {
    return axios.post(BASE_URL + "token/", {
        email,
        password,
    });
}
