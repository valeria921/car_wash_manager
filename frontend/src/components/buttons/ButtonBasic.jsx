import "./styles.css";

export const BUTTON_TYPES = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    SUCCESS: "success",
    DANGER: "danger",
};

const ButtonBasic = ({
    buttonType = BUTTON_TYPES.PRIMARY,
    children,
    onClick,
    extraClasses,
    extraStyles,
}) => {
    function getClassName() {
        switch (buttonType) {
            case BUTTON_TYPES.PRIMARY:
                return "primaryButton";
            case BUTTON_TYPES.SECONDARY:
                return "secondaryButton";
            case BUTTON_TYPES.SUCCESS:
                return "successButton";
            case BUTTON_TYPES.DANGER:
                return "dangerButton";
        }
    }

    return (
        <button
            className={"defaultButton " + getClassName() + " " + extraClasses}
            onClick={onClick}
            style={extraStyles}
        >
            {children}
        </button>
    );
};

export default ButtonBasic;
