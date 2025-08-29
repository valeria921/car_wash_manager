import { useEffect, useState } from "react";

import { FormInput, FormRadioButtons } from "./formFields";
import FormCheckBoxes from "./formFields/FormCheckBoxes";
import FormDatePicker from "./formFields/FormDatePicker";

import ButtonBasic, { BUTTON_TYPES } from "../../components/buttons/ButtonBasic";

import "./style.css";

export const INPUT_TYPES = {
    textInput: 1,
    radioInput: 2,
    checkBoxInput: 3,
    datePicker: 4,
};

const CreateUpdateForm = ({
    formValues = [
        {
            label: "service name",
            value: "",
            type: INPUT_TYPES.textInput,
            inputValueType: "text",
            name: "",
        },
        {
            label: "service type",
            value: "",
            type: INPUT_TYPES.radioInput,
            options: [
                { id: 1, label: "hand wash" },
                { id: 2, label: "dry wash" },
            ],
            name: "",
        },
        {
            label: "required skills",
            values: [],
            type: INPUT_TYPES.checkBoxInput,
            options: [
                { id: 1, label: "polishing" },
                { id: 2, label: "dry wash" },
            ],
            name: "",
        },
    ],
    onSubmit,
    onCancel,
}) => {
    const [values, setValues] = useState([]);

    console.log("Form Values ", formValues);
    console.log("Values ", values);

    useEffect(() => {
        initialiseDefaultValues();
    }, [formValues]);

    function initialiseDefaultValues() {
        const initialValues = formValues.map((each) => {
            return each.value !== undefined ? each.value : each.values;
        });
        setValues(initialValues);
    }

    function handleOnChange(e, inputType, index) {
        const value = e.target.value;
        const newValues = [...values];
        if (inputType === INPUT_TYPES.checkBoxInput) {
            let currentCheckBoxValues = newValues[index];
            if (currentCheckBoxValues.includes(value)) {
                currentCheckBoxValues = currentCheckBoxValues.filter((each) => each != value);
            } else {
                currentCheckBoxValues.push(value);
            }
            newValues[index] = currentCheckBoxValues;
            setValues(newValues);
        } else {
            newValues[index] = value;
            setValues(newValues);
        }
    }

    function renderInput(eachFormValue, index) {
        function renderInputType() {
            switch (eachFormValue.type) {
                case INPUT_TYPES.textInput: {
                    return (
                        <FormInput
                            type={eachFormValue.inputValueType}
                            value={values[index]}
                            name={eachFormValue.label}
                            onChange={(e) => handleOnChange(e, eachFormValue.type, index)}
                        />
                    );
                }
                case INPUT_TYPES.radioInput: {
                    return (
                        <FormRadioButtons
                            value={values[index]}
                            name={eachFormValue.label}
                            options={eachFormValue.options}
                            onChange={(e) => handleOnChange(e, eachFormValue.type, index)}
                        />
                    );
                }
                case INPUT_TYPES.checkBoxInput: {
                    return (
                        <FormCheckBoxes
                            values={values[index]}
                            name={eachFormValue.label}
                            options={eachFormValue.options}
                            onChange={(e) => handleOnChange(e, eachFormValue.type, index)}
                        />
                    );
                }
                case INPUT_TYPES.datePicker: {
                    return (
                        <FormDatePicker
                            values={values[index]}
                            name={eachFormValue.label}
                            options={eachFormValue.options}
                            onChange={(e) => handleOnChange(e, eachFormValue.type, index)}
                        />
                    );
                }
            }
        }

        return (
            <div>
                <label>{eachFormValue.label}</label>
                {renderInputType()}
            </div>
        );
    }

    function prepareDataBeforeSubmit() {
        const preparedData = {};
        formValues.forEach((each, index) => {
            preparedData[each.name] = values[index];
        });
        console.log(preparedData);
        onSubmit(preparedData);
    }

    return (
        <div>
            {formValues.map((eachFormValue, index) => renderInput(eachFormValue, index))}
            <div>
                <ButtonBasic
                    buttonType={BUTTON_TYPES.SUCCESS}
                    extraClasses={"spaceBottom"}
                    onClick={prepareDataBeforeSubmit}
                >
                    Save
                </ButtonBasic>
                <ButtonBasic
                    buttonType={BUTTON_TYPES.DANGER}
                    extraClasses={"spaceBottom"}
                    onClick={onCancel}
                >
                    Cancel
                </ButtonBasic>
            </div>
        </div>
    );
};

export default CreateUpdateForm;
