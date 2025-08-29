import "./style.css";

const FormSelect = ({ name, value, onChange, options }) => (
    <select class="form-select" name={name} value={value} onChange={onChange}>
        <option value="">Select...</option>
        {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
                {opt.label}
            </option>
        ))}
    </select>
);

export default FormSelect;
