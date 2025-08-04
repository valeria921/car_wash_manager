import ButtonBasic from "./buttons/ButtonBasic";
import { useNavigate } from "react-router-dom";
import { authActions } from "../redux/actions";
import { ROLES, STORAGE_KEYS } from "../constants";
import { useDispatch } from "react-redux";

const SideNavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);

    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate("/");
        return;
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.ROLE);
        navigate("/");
    };

    return (
        <nav className="sidebar bg-dark text-white p-3">
            <h4 className="mb-4">🚗 Car Wash</h4>
            <div>
                <ul className="nav flex-column">
                    <li>
                        <ButtonBasic onClick={() => navigate("/workers")}>
                            Manage Workers
                        </ButtonBasic>
                    </li>
                    <li>
                        <ButtonBasic onClick={() => navigate("/skills")}>Manage Skills</ButtonBasic>
                    </li>
                    <li>
                        <ButtonBasic onClick={() => navigate("/services")}>
                            Manage Services
                        </ButtonBasic>
                    </li>
                </ul>
            </div>
            <div>
                <ButtonBasic onClick={handleLogout}>Log out</ButtonBasic>
            </div>
        </nav>
    );
};

export default SideNavBar;
