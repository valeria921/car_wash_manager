import React from "react";

const FormCheckBoxes = ({ name, values = [], onChange, options }) => {
    console.log(values);
    console.log(options);
    return (
        <>
            {options.map((opt, index) => (
                <label key={index} style={{ display: "block", margin: "4px 0" }}>
                    <input
                        type="checkbox"
                        name={name}
                        value={opt.id}
                        checked={values.some((each) => each == opt.id)}
                        onChange={onChange}
                    />
                    {opt.label}
                </label>
            ))}
        </>
    );
};

export default FormCheckBoxes;
