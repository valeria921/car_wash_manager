import { useState } from "react";

export const useFormFields = (initialValues) => {
    const [fields, setFields] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    return [fields, setFields, handleChange];
};
