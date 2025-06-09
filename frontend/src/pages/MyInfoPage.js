import React, { useEffect, useState } from "react";
import axios from "axios";
import { STORAGE_KEYS } from "../constants";
import { useNavigate } from "react-router-dom";

function MyInfoPage() {
    const [myInfo, setMyInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/workers/me/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`,
                    },
                });
                setMyInfo(res.data);
            } catch (err) {
                console.error("Error fetching user info:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyInfo();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!myInfo) return <div>Could not load your info.</div>;

    return (
        <div>
            <h2>My Info</h2>
            <p>
                Name: {myInfo.name} {myInfo.surname}
            </p>
            <p>Phone: {myInfo.phone}</p>
            <p>Start Date: {myInfo.start_date}</p>
            <p>
                Skills:
                {myInfo.skills && myInfo.skills.length > 0
                    ? myInfo.skills.map((skill) => skill.skill_name).join(", ")
                    : "No skills listed"}
            </p>
            <button onClick={handleBack} style={{ marginTop: "20px" }}>
                ← Back
            </button>
        </div>
    );
}

export default MyInfoPage;
