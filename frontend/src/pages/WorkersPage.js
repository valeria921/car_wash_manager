import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES, STORAGE_KEYS } from "../constants";
import { workersApi } from "../apis";
import TableBasic from "../components/tables/TableBasic";
import CreateUpdateForm, { INPUT_TYPES } from "../components/forms/CreateUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { skillsActions, workersActions } from "../redux/actions";

function WorkersPage() {
    const dispatch = useDispatch();
    const workers = useSelector((state) => state.workers.workers);
    const skills = useSelector((state) => state.skills.skills);
    // const [workers, setWorkers] = useState([]);
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

    // useEffect(() => {
    //     workersApi.fetchWorkers().then((res) => {
    //         console.log(res.data);
    //         setWorkers(res.data);
    //     });
    // }, []);

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
        // try {
        //     await workersApi.deleteWorker(workerId);
        //     setWorkers((prev) => prev.filter((worker) => worker.id !== workerId));
        // } catch (err) {
        //     console.error("Error deleting worker:", err);
        // }
    };

    const handleBack = () => {
        navigate(-1);
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
                    className: "btn btn-primary btn-sm me-2",
                    onClick: () => handleUpdate(workerId),
                },
                {
                    name: "Delete",
                    className: "btn btn-danger btn-sm",
                    onClick: () => handleDelete(workerId),
                },
            ];
        }
        return [
            {
                name: "Update",
                className: "btn btn-primary btn-sm me-2",
                onClick: () => handleUpdate(workerId),
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
        console.log(workers);
        console.log(selectedWorker);
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
        <div className="container my-4">
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
                <button className="btn btn-success mt-3" onClick={handleNewWorker}>
                    + New Worker
                </button>
            )}
            <br />
            <button className="btn btn-outline-secondary mt-3" onClick={handleBack}>
                ← Back
            </button>
        </div>
    );
}

export default WorkersPage;
