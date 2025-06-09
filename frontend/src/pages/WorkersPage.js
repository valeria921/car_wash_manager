import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES, STORAGE_KEYS } from "../constants";
import { workersApi } from "../apis";
import TableBasic from "../components/tables/TableBasic";

function WorkersPage() {
    const [workers, setWorkers] = useState([]);
    const navigate = useNavigate();
    const userRole = localStorage.getItem(STORAGE_KEYS.ROLE);

    useEffect(() => {
        workersApi.fetchWorkers().then((res) => {
            setWorkers(res.data);
        });
    }, []);

    // Navigate to update page for a given worker
    const handleUpdate = (workerId) => {
        navigate(`/workers/update/${workerId}`);
    };

    // Navigate to create new worker page
    const handleNewWorker = () => {
        navigate("/workers/new");
    };

    // Navigate to delete worker page
    const handleDelete = async (workerId) => {
        const confirmed = window.confirm("Are you sure you want to delete this worker?");
        if (!confirmed) return;

        try {
            await workersApi.deleteWorker(workerId);
            setWorkers((prev) => prev.filter((worker) => worker.id !== workerId));
        } catch (err) {
            console.error("Error deleting worker:", err);
        }
    };

    const handleBack = () => {
        navigate(-1);
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
                skills: eachWorker.skills.map((skill) => skill.skill_name).join(", "),
                buttons: getTableRowButtons(eachWorker.id),
            };
        });
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
