import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StartPage() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Welcome to Car Wash App</h1>
            <button onClick={handleLoginClick}>Log In</button>
        </div>
    );
}

export default StartPage;
