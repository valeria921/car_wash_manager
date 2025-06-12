import React from "react";

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
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>{tableName}</h2>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
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
                                                <button
                                                    key={index}
                                                    className={eachButton.className}
                                                    onClick={eachButton.onClick}
                                                >
                                                    {eachButton.name}
                                                </button>
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
