import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/actions";
import colorPallet from "../assets/colorPallet";
import ButtonBasic from "../components/buttons/ButtonBasic";

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
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <div
                style={{ backgroundColor: colorPallet.navyBlue }}
                className="p-5 text-center rounded col-lg-6 col-xl-5"
            >
                <h1 className="text-light text-center mb-4">Login to the manager</h1>
                <form onSubmit={handleSubmit}>
                    <div className=" mb-3 ">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className=" mb-3 ">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <ButtonBasic
                        buttonType="buttonSuccess"
                        extraClasses="mb-3"
                        type="submit"
                    >Login</ButtonBasic>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
