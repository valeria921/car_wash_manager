import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav
            className="navbar container pt-3  align-items-start"
            style={{ maxHeight: "calc(50px + 5vh)" }}
        >
            <Link className="navbar-brand" to="/">
            🚘 Car Wash Manager
            </Link>
        </nav>
    );
};

export default Header;
