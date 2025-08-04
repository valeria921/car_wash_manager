import "./styles.css";
import colorPallet from "../../assets/colorPallet";

const ButtonBasic = ({ buttonType, type, children, onClick, extraClasses, extraStyles }) => {
    function getClassName() {
        return  "btn mt-3 text-light "
    }

    function getInlineStyles() {
        switch (buttonType) {
            case "buttonPrimary":
                return {
                    backgroundColor: colorPallet.darkGray,
                    ...extraStyles,
                };
            case "buttonSecondary":
                return {
                    backgroundColor: colorPallet.darkGray,
                    ...extraStyles,
                };
            case "buttonSuccess":
                return {
                    backgroundColor: colorPallet.green,
                    ...extraStyles,
                };
            case "buttonDanger":
                return {
                    backgroundColor: colorPallet.red,
                    ...extraStyles,
                };
        }
    }

    return (
        <button
        type={type}
            style={getInlineStyles()}
            className={getClassName() + extraClasses}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonBasic;
