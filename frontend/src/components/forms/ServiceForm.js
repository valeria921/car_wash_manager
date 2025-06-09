import React, { useState, useEffect } from "react";
import { FormRow, FormInput, FormSelect, FormRadioButtons } from "./formFields";

const ServiceForm = ({ initialData = {}, serviceTypes, skillsList, onSubmit, onCancel }) => {
    const emptyService = {
        service_name: "",
        service_type: "",
        default_commission_percentage: "",
        required_skills: [],
    };

    const [form, setForm] = useState(initialData || emptyService);

    useEffect(() => {
        setForm(initialData || emptyService);
    }, [initialData]);

    const handleChange = (e, overrideValue) => {
        const { name, value } = e.target;
        console.log("Handle name");
        console.log("handle value:, ", overrideValue);
        setForm((prevForm) => ({
            ...prevForm,
            [name]: overrideValue ? overrideValue : value,
        }));
    };

    const getSkillName = (id) => {
        return skillsList.find((eachSkill) => eachSkill.id === id)?.skill_name;
    };

    const getServiceTypeName = (id) => {
        console.log(serviceTypes);
        console.log(id);
        return serviceTypes.find((eachService) => eachService.id === id)?.service_type_name;
    };

    const handleSkillCheckboxChange = (e) => {
        const skillId = parseInt(e.target.value);
        const isChecked = e.target.checked;

        setForm((prevForm) => {
            const updatedSkills = isChecked
                ? [
                      ...prevForm.required_skills,

                      {
                          id: skillId,
                          skill_name: getSkillName(skillId),
                      },
                  ]
                : prevForm.required_skills.filter((each) => each.id !== skillId);

            return {
                ...prevForm,
                required_skills: updatedSkills,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    const serviceTypeOptions = serviceTypes.map((type) => ({
        id: type.id,
        label: type.service_type_name,
    }));

    return (
        <form onSubmit={handleSubmit}>
            <FormRow label="Service Name">
                <FormInput name="service_name" value={form.service_name} onChange={handleChange} />
            </FormRow>

            <FormRow label="Default Commission (%)">
                <FormInput
                    name="default_commission_percentage"
                    value={form.default_commission_percentage}
                    onChange={handleChange}
                    type="number"
                />
            </FormRow>

            <FormRow label="Service Type">
                <FormRadioButtons
                    name="service_type"
                    value={form.service_type}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        const id = parseInt(value);
                        console.log("NAAAaame, ", getServiceTypeName(id));
                        handleChange(e, {
                            id: id,
                            service_type_name: getServiceTypeName(id),
                        });
                    }}
                    options={serviceTypeOptions}
                />
            </FormRow>

            <FormRow label="Required Skills">
                {skillsList?.map((skill) => (
                    <label key={skill.id} style={{ display: "block", marginBottom: "4px" }}>
                        <input
                            type="checkbox"
                            value={skill.id}
                            checked={form.required_skills.some((each) => each.id === skill.id)}
                            onChange={(e) => {
                                handleSkillCheckboxChange(e);
                            }}
                        />
                        {skill.skill_name}
                    </label>
                ))}
            </FormRow>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button type="submit">Save</button>
                {onCancel && (
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ServiceForm;
