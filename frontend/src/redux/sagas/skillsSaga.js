import { takeLatest, call, put } from "redux-saga/effects";
import { $, skillsActions } from "../actions/index";
import { skillsApi } from "../../apis";

function* getSkills() {
    try {
        const response = yield call(skillsApi.fetchSkills);
        console.log(response.data);
        yield put(skillsActions.getSkillsCompleted(response.data));
    } catch (e) {
        console.log("eeee");
    }
}

function* updateSkill(action) {
    try {
        const response = yield call(skillsApi.updateSkill, action.payload);
        yield put(skillsActions.getSkills());
    } catch (e) {}
}

function* createSkill(action) {
    try {
        const response = yield call(skillsApi.createSkill, action.payload);
        yield put(skillsActions.getSkills());
    } catch (e) {}
}

function* deleteSkill(action) {
    try {
        const response = yield call(skillsApi.deleteSkill, action.payload);
        yield put(skillsActions.getSkills());
    } catch (e) {}
}

export const skillsSaga = [
    takeLatest($.GET_SKILLS, getSkills),
    takeLatest($.UPDATE_SKILL, updateSkill),
    takeLatest($.CREATE_SKILL, createSkill),
    takeLatest($.DELETE_SKILL, deleteSkill),
];
