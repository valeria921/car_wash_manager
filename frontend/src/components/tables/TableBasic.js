import React from "react";
import "./style.css"
import ButtonBasic from "../buttons/ButtonBasic";

const TableBasic = ({
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
            buttons: [
                { name: "button1", className: "", onClick: () => "" },
                { name: "button2", className: "", onClick: () => "" },
            ],
        },
        {
            name: "worker2",
            surname: "surname2",
        },
    ],
    rowKeysToRender = ["name", "surname"],
}) => {
    return (
        <>
            <div class="table-header">
                <h2>{tableName}</h2>
            </div>
            <div class="table-container">
                <table class="custom-table">
                    <thead class="custom-table__head">
                        <tr>
                            {columnNames.map((eachRow, index) => {
                                return <th key={index}>{eachRow.name}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((eachColumn, index) => {
                            return (
                                <tr key={index}>
                                    {rowKeysToRender.map((eachKey) => {
                                        return <td key={eachKey}>{eachColumn[eachKey]}</td>;
                                    })}
                                    <td>
                                        {eachColumn.buttons?.map((eachButton, index) => {
                                            return (
                                                <ButtonBasic
                                                    key={index}
                                                    buttonType={eachButton.buttonType}
                                                    onClick={eachButton.onClick}
                                                >
                                                    {eachButton.name}
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

export default TableBasic;
