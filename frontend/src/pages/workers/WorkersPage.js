import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES, STORAGE_KEYS } from "../../constants";
import TableBasic from "../../components/tables/TableBasic";
import ButtonBasic, { BUTTON_TYPES } from "../../components/buttons/ButtonBasic";
import CreateUpdateForm, { INPUT_TYPES } from "../../components/forms/CreateUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { skillsActions, workersActions } from "../../redux/actions";
import "./style.css";
import "../main.css";


function WorkersPage() {
    const dispatch = useDispatch();
    const workers = useSelector((state) => state.workers.workers);
    const skills = useSelector((state) => state.skills.skills);
    const navigate = useNavigate();
    const userRole = localStorage.getItem(STORAGE_KEYS.ROLE);
    const [formMode, setFormMode] = useState(null);
    const [selectedWorker, setSelectedWorker] = useState(null);

    useEffect(() => {
        dispatch(workersActions.getWorkers());
    }, []);

    useEffect(() => {
        dispatch(skillsActions.getSkills());
    }, []);

    const handleNewWorker = () => {
        setFormMode("create");
    };

    const handleUpdate = (workerId) => {
        const found = workers.find((s) => s.id === workerId);
        setSelectedWorker(found);
        setFormMode("edit");
    };

    const handleDelete = async (workerId) => {
        const confirmed = window.confirm("Are you sure you want to delete this worker?");
        if (!confirmed) return;
        dispatch(workersActions.deleteWorker(workerId));
    };

    const handleCancelForm = () => {
        setSelectedWorker(null);
        setFormMode(null);
    };

    const handleFormSubmit = async (data) => {
        try {
            if (formMode === "create") {
                dispatch(workersActions.createWorker(data));
            } else if (formMode === "edit") {
                dispatch(
                    workersActions.updateWorker({
                        ...data,
                        id: selectedWorker.id,
                    }),
                );
            }
            setFormMode(null);
            setSelectedWorker(null);
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    function getTableRowButtons(workerId) {
        if (userRole === ROLES.OWNER) {
            return [
                {
                    name: "Update",
                    onClick: () => handleUpdate(workerId),
                    buttonType: BUTTON_TYPES.PRIMARY,
                },
                {
                    name: "Delete",
                    onClick: () => handleDelete(workerId),
                    buttonType: BUTTON_TYPES.SECONDARY,
                },
            ];
        }
        return [
            {
                name: "Update",
                onClick: () => handleUpdate(workerId),
                buttonType: BUTTON_TYPES.PRIMARY,
            },
        ];
    }

    function getModifiedTableData() {
        return workers.map((eachWorker) => {
            return {
                ...eachWorker,
                skills: eachWorker.skills
                    ? eachWorker.skills.map((skill) => skill.skill_name).join(", ")
                    : "",
                buttons: getTableRowButtons(eachWorker.id),
            };
        });
    }

    function convertSelectedWorkerToFormValues() {
        return [
            {
                label: "Name",
                value: selectedWorker?.name ?? "",
                type: INPUT_TYPES.textInput,
                name: "name",
            },
            {
                label: "Surname",
                value: selectedWorker?.surname ?? "",
                type: INPUT_TYPES.textInput,
                name: "surname",
            },
            {
                label: "Phone",
                value: selectedWorker?.phone ?? "",
                type: INPUT_TYPES.textInput,
                name: "phone",
            },
            {
                label: "Skills",
                values: selectedWorker?.skills.map((each) => each.id) ?? [],
                type: INPUT_TYPES.checkBoxInput,
                options: skills?.map((each) => ({
                    id: each.id,
                    label: each.skill_name,
                })),
                name: "skills",
            },
        ];
    }

    return (
        <div class="page-content">
            <TableBasic
                tableName="All Workers"
                columnNames={[
                    { name: "Name" },
                    { name: "Surname" },
                    { name: "Phone" },
                    { name: "Skills" },
                    { name: "Actions" },
                ]}
                rows={getModifiedTableData()}
                rowKeysToRender={["name", "surname", "phone", "skills"]}
            />

            {formMode && (
                <CreateUpdateForm
                    onUpdate={(values) => console.log(values)}
                    formValues={convertSelectedWorkerToFormValues()}
                    onSubmit={(data) => handleFormSubmit(data)}
                    onCancel={(data) => handleCancelForm(data)}
                />
            )}

            {userRole === ROLES.OWNER && (
                    <ButtonBasic
                        buttonType={BUTTON_TYPES.SUCCESS}
                        extraStyles={{ fontSize: "18px" }}
                        onClick={handleNewWorker}
                    >
                        + New Worker
                    </ButtonBasic>
            )}
        </div>
    );
}

export default WorkersPage;
