import ButtonBasic from "../buttons/ButtonBasic";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../redux/actions";
import { ROLES, STORAGE_KEYS } from "../../constants";
import { useDispatch } from "react-redux";
import "./style.css";

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
        <>
            <nav class="sidebar">
                <div class="sidebar-content">
                    <button onClick={() => navigate("/dashboard")}>Car Wash 🫧 </button>
                    <div class="nav-block">
                        <ul>
                            <li class="nav-block__item">
                                <button onClick={() => navigate("/orders")}>Manage Orders</button>
                            </li>
                            <li class="nav-block__item">
                                <button onClick={() => navigate("/clients")}>Manage Clients</button>
                            </li>
                            <li class="nav-block__item">
                                <button onClick={() => navigate("/workers")}>Manage Workers</button>
                            </li>
                            <li class="nav-block__item">
                                <button onClick={() => navigate("/skills")}>Manage Skills</button>
                            </li>
                            <li class="nav-block__item">
                                <button onClick={() => navigate("/services")}>
                                    Manage Services
                                </button>
                            </li>
                            <li class="nav-block__item">
                                <button onClick={() => navigate("/costs")}>Manage Costs</button>
                            </li>
                            <li class="nav-block__item">
                                <button onClick={() => navigate("/reports")}>Manage Salaries</button>
                            </li>
                            <li class="nav-block__item">
                                <button onClick={() => navigate("/reports")}>Reports</button>
                            </li>
                        </ul>
                    </div>
                    <button class="logout" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </nav>
        </>
    );
};

export default SideNavBar;
