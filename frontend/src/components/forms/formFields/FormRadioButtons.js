import "./style.css";

const FormRadioButtons = ({ name, value, onChange, options }) => {
    return (
        <>
            {options.map((opt, index) => (
                <label key={index} style={{ display: "block", margin: "4px 0" }}>
                    <input
                        type="radio"
                        name={name}
                        value={opt.id}
                        checked={opt.id == value}
                        onChange={onChange}
                    />
                    {opt.label}
                </label>
            ))}
        </>
    );
};

export default FormRadioButtons;
