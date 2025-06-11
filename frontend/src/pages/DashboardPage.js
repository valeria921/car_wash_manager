import { useNavigate } from "react-router-dom";
import { ROLES, STORAGE_KEYS } from "../constants";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/actions";

function DashboardPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);

    const handleLogout = () => {
        console.log("1 = LOGOUT STARTED");
        dispatch(authActions.logout());
        navigate("/login");
        return;
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.ROLE);
        navigate("/login");
    };

    function renderRoleButtons() {
        if ([ROLES.OWNER, ROLES.MANAGER].includes(role)) {
            return (
                <div className="d-flex flex-column align-items-start gap-2 mt-3">
                    <button onClick={() => navigate("/workers")}>Manage Workers</button>
                    <button onClick={() => navigate("/skills")}>Manage Skills</button>
                    <button onClick={() => navigate("/services")}>Manage Services</button>
                </div>
            );
        }
        if (role === ROLES.WORKER) {
            return <button onClick={() => navigate("/my-info")}>My Profile</button>;
        }
    }

    return (
        <div className="container my-4">
            <h2>Welcome to the Dashboard! - {role}</h2>
            <p>You are now logged in ✅</p>
            {renderRoleButtons()}
            <button onClick={handleLogout} className="btn btn-outline-secondary mt-3">
                Log out
            </button>
        </div>
    );
}

export default DashboardPage;
