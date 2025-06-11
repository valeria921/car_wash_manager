import * as $ from "./actionTypes";

export function getSkills() {
    return {
        type: $.GET_SKILLS,
    };
}

export function getSkillsCompleted(skills) {
    return {
        type: $.GET_SKILLS_COMPLETED,
        payload: skills,
    };
}

export function updateSkill(data) {
    return {
        type: $.UPDATE_SKILL,
        payload: data,
    };
}

export function createSkill(data) {
    return {
        type: $.CREATE_SKILL,
        payload: data,
    };
}

export function deleteSkill(skillId) {
    return {
        type: $.DELETE_SKILL,
        payload: skillId,
    };
}
