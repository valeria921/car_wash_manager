const FormRow = ({ label, children }) => (
    <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: ".3rem" }}>{label}</label>
        {children}
    </div>
);

export default FormRow;
