import React from "react";

const RepeatFailuresTable = () => {
    const repeatFailuresData = [
        {
            machine: "M4",
            failures: 3,
            dates: ["2 Jul", "14 Jul", "28 Jul"],
            month: "July",
        },
        {
            machine: "M1",
            failures: 2,
            dates: ["5 Jul", "25 Jul"],
            month: "July",
        },
        {
            machine: "M2",
            failures: 4,
            dates: ["3 Jul", "10 Jul", "18 Jul", "29 Jul"],
            month: "July",
        },
    ];

    return (
        <div className=" col-lg-12 col-md-12 col-12">
            <div className="card-container">
                <h6 style={{ textAlign: "left", fontWeight: "600" }}>Repeat Failures Table</h6>

                <div className="table-responsive" style={{ fontSize: "13px" }}>
                    <table className="table table-bordered table-hover table-sm" >
                        <thead className="table-light">
                            <tr>
                                <th>Machine</th>
                                <th>No. of Failures</th>
                                <th>Last Failure Dates (within 30 days)</th>
                                <th>Month</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repeatFailuresData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.machine}</td>
                                    <td>{item.failures}</td>
                                    <td>{item.dates.join(", ")}</td>
                                    <td>{item.month}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RepeatFailuresTable;
