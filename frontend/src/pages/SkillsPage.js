import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES, STORAGE_KEYS } from "../constants";
import { servicesApi, skillsApi, workersApi } from "../apis";
import TableBasic from "../components/tables/TableBasic";
import CreateUpdateForm, { INPUT_TYPES } from "../components/forms/CreateUpdateForm";

function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const navigate = useNavigate();
    const userRole = localStorage.getItem(STORAGE_KEYS.ROLE);
    const [formMode, setFormMode] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);

    useEffect(() => {
        skillsApi.fetchSkills().then((res) => {
            setSkills(res.data);
        });
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

        try {
            await skillsApi.deleteSkill(skillId);
            setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
        } catch (err) {
            console.error("Error deleting skill:", err);
        }
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
                await skillsApi.createSkill({
                    ...data,
                });
            } else if (formMode === "edit") {
                await skillsApi.updateSkill({
                    ...data,
                    id: selectedSkill.id,
                });
            }

            const updated = await skillsApi.fetchSkills();
            setSkills(updated.data);
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
                    className: "btn btn-primary btn-sm me-2",
                    onClick: () => handleUpdate(skillId),
                },
                {
                    name: "Delete",
                    className: "btn btn-danger btn-sm",
                    onClick: () => handleDelete(skillId),
                },
            ];
        }
        return [
            {
                name: "Update",
                className: "btn btn-primary btn-sm me-2",
                onClick: () => handleUpdate(skillId),
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
        <div>
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
                <button className="btn btn-success mt-3" onClick={handleNewSkill}>
                    + New skill
                </button>
            )}
            <br />
            <button className="btn btn-outline-secondary mt-3" onClick={handleBack}>
                ← Back
            </button>
        </div>
    );
}

export default SkillsPage;
