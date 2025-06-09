const FormInput = ({ name, value, onChange, type = "text" }) => (
    <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{ padding: "0.5rem", width: "100%" }}
    />
);

export default FormInput;
