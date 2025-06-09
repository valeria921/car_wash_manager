import axios from "axios";
import { BASE_URL, STORAGE_KEYS } from "../constants";

export const fetchSkills = () => {
        return axios.get(BASE_URL + "skills", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
            },
        });
    },
    deleteSkill = (skillId) => {
        return axios.delete(`${BASE_URL}skills/${skillId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
            },
        });
    },
    createSkill = (skillData) => {
        return axios.post(`${BASE_URL}skills/`, skillData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
                "Content-Type": "application/json",
            },
        });
    },
    updateSkill = (skill) => {
        console.log(skill);
        return axios.put(`${BASE_URL}skills/${skillId}`);
    };
