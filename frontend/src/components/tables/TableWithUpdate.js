import React, { useEffect, useState } from "react";
import { INPUT_TYPES } from "../forms/CreateUpdateForm";
import { FormInput } from "../forms/formFields";
import ButtonBasic from "../buttons/ButtonBasic";

const TableWithUpdate = ({
    tableName,
    columnNames = [
        {
            name: "row1",
        },
        {
            name: "row2",
        },
    ],
    rows = [
        {
            name: "worker1",
            surname: "surname1",
        },
        {
            name: "worker2",
            surname: "surname2",
        },
    ],
    rowKeysToRender = ["name", "surname"],
    rowsToEdit = [
        {
            name: "name",
            type: INPUT_TYPES.textInput,
            inputValueType: "text",
        },
    ],
    onSubmit,
    onDelete,
}) => {
    const [rowValues, setRowValues] = useState([]);
    const [updateEnabledRows, setUpdateEnabledRows] = useState([]);

    console.log(rows);

    useEffect(() => {
        setInitialRowValues();
    }, [rows?.length]);

    function setInitialRowValues() {
        let values = [];
        rowKeysToRender.forEach((rowKeyToRender) => {
            rows.forEach((eachRow) => {
                if (eachRow[rowKeysToRender]) {
                    values.push({
                        id: eachRow.id,
                        [rowKeyToRender]: eachRow[rowKeysToRender],
                    });
                }
            });
        });
        setRowValues(values);
    }

    function updateRowValue(value, key, index) {
        console.log("Selected Row that we update");
        const newRowValues = [...rowValues];
        console.log(newRowValues[index]);
        newRowValues[index] = {
            ...newRowValues[index],
            [key]: value,
        };
        console.log(newRowValues);
        setRowValues(newRowValues);
    }

    function handleUpdate(index) {
        const updateEnabled = updateEnabledRows.includes(index);
        if (!updateEnabled) {
            return setUpdateEnabledRows([...updateEnabledRows, index]);
        }
        if (updateEnabled) {
            setUpdateEnabledRows([...updateEnabledRows].filter((each) => each !== index));
            return onSubmit(rowValues[index]);
        }
    }

    function handleDelete(index) {
        const updateEnabled = updateEnabledRows.includes(index);
        console.log(rowValues[index]);
        if (!updateEnabled) {
            return onDelete(rowValues[index].id);
        }
        if (updateEnabled) {
            return setUpdateEnabledRows([...updateEnabledRows].filter((each) => each !== index));
        }
    }

    function renderRow(eachRow, eachKey, rowIndex) {
        const updateEnabled = updateEnabledRows.includes(rowIndex);
        const value = eachRow[eachKey];
        if (updateEnabled) {
            const editableRow = rowsToEdit.find((rowToEdit) => rowToEdit.name === eachKey);
            if (editableRow) {
                const theRowThatWeEdit = rowValues[rowIndex];
                return (
                    <FormInput
                        type={editableRow.inputValueType}
                        name={editableRow.name}
                        value={theRowThatWeEdit[eachKey]}
                        onChange={(e) => updateRowValue(e.target.value, eachKey, rowIndex)}
                    />
                );
            }
        }
        return value;
    }

    return (
        <>
            <div class="table-header">
                <h2>{tableName}</h2>
            </div>
            <div class="table-container">
                <table class="custom-table">
                    <thead class="custom-table__head">
                        <tr>
                            {columnNames.map((eachColumn, index) => {
                                return <th key={index}>{eachColumn.name}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((eachRow, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    {rowKeysToRender.map((eachKey) => {
                                        return (
                                            <td key={eachKey}>
                                                {renderRow(eachRow, eachKey, rowIndex)}
                                            </td>
                                        );
                                    })}
                                    <td>
                                        {eachRow.buttons.map((eachButton, index) => {
                                            const updateEnabled =
                                                updateEnabledRows.includes(rowIndex);
                                            const isDeleteButton =
                                                eachButton?.buttonAction === "Delete";
                                            function decideOnClick() {
                                                if (isDeleteButton) {
                                                    return handleDelete(rowIndex);
                                                }
                                                return handleUpdate(rowIndex);
                                            }

                                            function getButtonName() {
                                                if (updateEnabled) {
                                                    return isDeleteButton ? "Cancel" : "Save";
                                                }
                                                return eachButton.name;
                                            }
                                            return (
                                                <ButtonBasic
                                                    key={index}
                                                    buttonType={eachButton.buttonType}
                                                    onClick={decideOnClick}
                                                >
                                                    {getButtonName()}
                                                </ButtonBasic>
                                            );
                                        })}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TableWithUpdate;
