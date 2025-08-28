import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES, STORAGE_KEYS } from "../../constants";
import TableBasic from "../../components/tables/TableBasic";
import CreateUpdateForm, { INPUT_TYPES } from "../../components/forms/CreateUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { skillsActions } from "../../redux/actions";
import "./style.css";
import "../main.css";
import ButtonBasic, { BUTTON_TYPES } from "../../components/buttons/ButtonBasic";

function SkillsPage() {
    const dispatch = useDispatch();
    const skills = useSelector((state) => state.skills.skills);
    const navigate = useNavigate();
    const userRole = localStorage.getItem(STORAGE_KEYS.ROLE);
    const [formMode, setFormMode] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);

    useEffect(() => {
        dispatch(skillsActions.getSkills());
    }, []);

    const handleNewSkill = () => {
        setFormMode("create");
    };

    const handleUpdate = (skillId) => {
        const found = skills.find((s) => s.id === skillId);
        setSelectedSkill(found);
        setFormMode("edit");
    };

    const handleDelete = async (skillId) => {
        const confirmed = window.confirm("Are you sure you want to delete this skill?");
        if (!confirmed) return;
        dispatch(skillsActions.deleteSkill(skillId));
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleCancelForm = () => {
        setSelectedSkill(null);
        setFormMode(null);
    };

    const handleFormSubmit = async (data) => {
        try {
            if (formMode === "create") {
                dispatch(skillsActions.createSkill(data));
            } else if (formMode === "edit") {
                dispatch(
                    skillsActions.updateSkill({
                        ...data,
                        id: selectedSkill.id,
                    }),
                );
            }
            setFormMode(null);
            setSelectedSkill(null);
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    function getTableRowButtons(skillId) {
        if (userRole === ROLES.OWNER) {
            return [
                {
                    name: "Update",
                    onClick: () => handleUpdate(skillId),
                    buttonType: BUTTON_TYPES.PRIMARY,
                },
                {
                    name: "Delete",
                    onClick: () => handleDelete(skillId),
                    buttonType: BUTTON_TYPES.SECONDARY,
                },
            ];
        }
        return [
            {
                name: "Update",
                onClick: () => handleUpdate(skillId),
                buttonType: BUTTON_TYPES.PRIMARY,
            },
        ];
    }

    function getModifiedTableData() {
        return skills.map((eachSkill) => {
            return {
                ...eachSkill,
                buttons: getTableRowButtons(eachSkill.id),
            };
        });
    }

    function convertSelectedSkillToFormValues() {
        return [
            {
                label: "Skill name",
                value: selectedSkill?.skill_name ?? "",
                type: INPUT_TYPES.textInput,
                name: "skill_name",
            },
        ];
    }

    return (
        <div class="page-content">
            {/* <button className="btn btn-outline-secondary mb-3" onClick={handleBack}>
                ← Back
            </button> */}
            <TableBasic
                tableName="All skills"
                columnNames={[{ name: "Skill name" }, { name: "Actions" }]}
                rows={getModifiedTableData()}
                rowKeysToRender={["skill_name"]}
            />

            {formMode && (
                <CreateUpdateForm
                    onUpdate={(values) => console.log(values)}
                    formValues={convertSelectedSkillToFormValues()}
                    onSubmit={(data) => handleFormSubmit(data)}
                    onCancel={(data) => handleCancelForm(data)}
                />
            )}

            {userRole === ROLES.OWNER && (
                <ButtonBasic
                    buttonType={BUTTON_TYPES.SUCCESS}
                    extraStyles={{ fontSize: "18px" }}
                    onClick={handleNewSkill}
                >
                    + New skill
                </ButtonBasic>
            )}
        </div>
    );
}

export default SkillsPage;
