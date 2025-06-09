import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../constants";
import { fetchSkills } from "../apis/skillsApi";

function NewWorkerPage() {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        start_date: "",
        skills: [],
    });

    useEffect(() => {
        fetchSkills().then((res) => {
            setSkills(res.data);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSkillsChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
            parseInt(option.value),
        );
        setFormData((prev) => ({
            ...prev,
            skills: selectedOptions,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/workers/", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
                },
            });
            navigate("/workers");
        } catch (err) {
            console.error("Error creating worker:", err);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h2>Create New Worker</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Surname: </label>
                    <input
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone: </label>
                    <input name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Start Date: </label>
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Skills: </label>
                    <select
                        multiple
                        name="skills"
                        value={formData.skills}
                        onChange={handleSkillsChange}
                    >
                        {skills.map((skill) => (
                            <option key={skill.id} value={skill.id}>
                                {skill.skill_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Worker</button>
            </form>
            <button onClick={handleBack} style={{ marginTop: "20px" }}>
                ← Back
            </button>
        </div>
    );
}

export default NewWorkerPage;
