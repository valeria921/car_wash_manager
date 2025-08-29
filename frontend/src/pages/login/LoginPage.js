import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/actions";
import ButtonBasic, { BUTTON_TYPES } from "../../components/buttons/ButtonBasic";
import "./style.css";

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
        <>
            <div class="login">
                <div class="login-block">
                    <h1>Login to the manager</h1>
                    <form onSubmit={handleSubmit}>
                        <div class="login-block__form">
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div class="login-block__form">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <ButtonBasic
                            buttonType={BUTTON_TYPES.SUCCESS}
                            extraClasses={"bigButton"}
                            type="submit"
                        >
                            Login
                        </ButtonBasic>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
