const FormDatePicker = ({ name, value, onChange, type = "date" }) => (
    <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{ padding: "0.5rem", width: "100%" }}
    />
);

export default FormDatePicker;
