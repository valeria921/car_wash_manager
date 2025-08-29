import { useNavigate } from "react-router-dom";
import ButtonBasic, { BUTTON_TYPES } from "../../components/buttons/ButtonBasic";
import './style.css'

function StartPage() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div class="introduction">
            <div class="introduction-block">
                <h1>Welcome to Car Wash Manager</h1>
                <p>
                    Easily manage your car wash business in one place. Track orders, monitor
                    earnings, manage workers and services and keep everything organized.
                </p>
                <ButtonBasic
                    buttonType={BUTTON_TYPES.SUCCESS}
                    onClick={handleLoginClick}
                    extraClasses={"bigButton"}
                >
                    Open manager
                </ButtonBasic>
            </div>
        </div>
    );
}

export default StartPage;
