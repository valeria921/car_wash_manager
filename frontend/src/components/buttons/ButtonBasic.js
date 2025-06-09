import "./styles.css";
import colors from "../../assets/colorPallet";

const ButtonBasic = ({ type, children, onClick }) => {
    function getDynamicStyle() {
        return {
            color: colors.red,
        };
    }
    return (
        <button style={getDynamicStyle()} className="defaultButtonStyle" onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonBasic;
