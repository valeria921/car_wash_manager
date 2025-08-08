import { useNavigate } from "react-router-dom";
import { ROLES, STORAGE_KEYS } from "../constants";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/actions";
import ButtonBasic from "../components/buttons/ButtonBasic";

function DashboardPage() {
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

    function renderRoleButtons() {
        if ([ROLES.OWNER, ROLES.MANAGER].includes(role)) {
            return (
                <>
                    <div>
                        <ButtonBasic>Manage Workers</ButtonBasic>
                    </div>
                </>
            );
        }
        if (role === ROLES.WORKER) {
            return <button onClick={() => navigate("/my-info")}>My Profile</button>;
        }
    }

    return (
        <div>
            <h2>Welcome to Car Wash Manager! - {role}</h2>
            <p>You are now logged in ✅</p>
            {renderRoleButtons()}
        </div>
    );
}

export default DashboardPage;
