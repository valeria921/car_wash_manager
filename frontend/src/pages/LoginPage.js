import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../constants";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access);
                localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh);
                localStorage.setItem(STORAGE_KEYS.USER_ID, data.user_id);
                localStorage.setItem(STORAGE_KEYS.ROLE, data.role);

                navigate("/dashboard");
            } else {
                alert("Login failed: " + (data.detail || "Unknown error"));
            }
        } catch (error) {
            alert("Error connecting to backend");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
