import "./style.css";

const FormInput = ({ label, name, value, onChange, type = "text" }) => (
  <div className="form-group">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="form-input"
    />
  </div>
);

export default FormInput;
