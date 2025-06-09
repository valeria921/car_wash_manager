import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../constants";
import { servicesApi } from "../apis";

function ServiceTypesPage() {
    const [serviceTypes, setServiceTypes] = useState([]);
    const navigate = useNavigate();
    const userRole = localStorage.getItem(STORAGE_KEYS.ROLE);

    useEffect(() => {
        servicesApi.fetchServiceTypes().then((res) => {
            setServiceTypes(res.data);
        });
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>All </h1>
            <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "50%" }}>
                <thead>
                    <tr>
                        <th>Skill name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill) => (
                        <tr key={skill.id}>
                            <td>{skill.skill_name}</td>
                            <td>Action</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleBack} style={{ marginTop: "20px" }}>
                ← Back
            </button>
        </div>
    );
}

export default SkillsPage;
