import { Link } from "react-router-dom";
import "./style.css"

const Header = () => {
    return (
        <nav class="navbar">
            <Link class="navbar-navigation" to="/">
                🚘 Car Wash Manager
            </Link>
        </nav>
    );
};

export default Header;
