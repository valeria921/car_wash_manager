const FormSelect = ({ name, value, onChange, options }) => (
    <select
        name={name}
        value={value}
        onChange={onChange}
        style={{ padding: "0.5rem", width: "100%" }}
    >
        <option value="">Select...</option>
        {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
                {opt.label}
            </option>
        ))}
    </select>
);

export default FormSelect;
