import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/actions";

function LoginPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    if (auth.role) {
        console.log("4 - EVERYTHING IS DONE WE HAVE DATA");
        console.log(auth);
    }

    useEffect(() => {
        if (auth.userId) {
            navigate("/dashboard");
        }
    }, [auth?.userId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(authActions.login(email, password));
    };

    return (
        <div className="container my-4">
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
