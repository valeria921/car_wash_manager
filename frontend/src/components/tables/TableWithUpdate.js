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
        if (!updateEnabled) {
            return onDelete(rowValues[index].id);
        }
        if (updateEnabled) {
            return setUpdateEnabledRows([...updateEnabledRows].filter((each) => each !== index));
        }
    }

    function getButtons(index) {
        const updateEnabled = updateEnabledRows.includes(index);
        return [
            {
                name: updateEnabled ? "Save" : "Update",
                onClick: handleUpdate,
            },
            {
                name: updateEnabled ? "Cancel" : "Delete",
                onClick: handleDelete,
            },
        ];
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
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>{tableName}</h2>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
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
                                        {getButtons(rowIndex).map((eachButton, index) => {
                                            return (
                                                <div>
                                                    <button
                                                        key={index}
                                                        className={eachButton.className}
                                                        onClick={() => eachButton.onClick(rowIndex)}
                                                    >
                                                        {eachButton.name}
                                                    </button>
                                                    <ButtonBasic
                                                        key={index}
                                                        buttonType={eachButton.buttonType}
                                                        onClick={eachButton.onClick}
                                                    >
                                                        {eachButton.name}
                                                    </ButtonBasic>
                                                </div>
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
