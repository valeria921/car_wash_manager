import axios from "axios";
import { BASE_URL, STORAGE_KEYS } from "../constants";

const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
});

export const fetchSkills = () => {
        return axios.get(BASE_URL + "skills", {
            headers: authHeaders(),
        });
    },
    deleteSkill = (skillId) => {
        return axios.delete(`${BASE_URL}skills/${skillId}/`, {
            headers: authHeaders(),
        });
    },
    createSkill = (skillData) => {
        return axios.post(`${BASE_URL}skills/`, skillData, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    },
    updateSkill = (skill) => {
        return axios.put(`${BASE_URL}skills/${skill.id}/`, skill, {
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
        });
    };
