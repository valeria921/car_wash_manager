import { useNavigate } from "react-router-dom";
import ButtonBasic from "../components/buttons/ButtonBasic";
import colorPallet from "../assets/colorPallet";

function StartPage() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <div className="row justify-content-center">
                <div
                    style={{ backgroundColor: colorPallet.navyBlue }}
                    className="col-lg-10 col-xl-8 p-5 text-center rounded"
                >
                    <h1 className="text-light p-3">Welcome to Car Wash Manager</h1>
                    <p className="text-light mb-3">
                        Easily manage your car wash business in one place. Track orders, monitor
                        earnings, manage workers and services and keep everything
                        organized.
                    </p>
                    <ButtonBasic
                        buttonType="buttonSuccess"
                        onClick={handleLoginClick}
                        extraClasses="mb-3"
                    >
                        Open manager
                    </ButtonBasic>
                </div>
            </div>
        </div>
    );
}

export default StartPage;
