import React, { useState } from "react";

const OEEHeatmap = () => {
    // Sample OEE matrix data
    const [data, setData] = useState([
        { machine: "MACHINE A", values: [78, 85, 88, 92, 70, 82, 87] },
        { machine: "MACHINE B", values: [65, 68, 72, 75, 80, 78, 85] },
        { machine: "MACHINE C", values: [55, 60, 63, 68, 65, 70, 75] },
        { machine: "MACHINE D", values: [88, 85, 82, 80, 78, 76, 74] },
        { machine: "MACHINE E", values: [91, 92, 90, 88, 85, 84, 82] },
        { machine: "MACHINE F", values: [91, 92, 90, 88, 85, 84, 82] },
    ]);

    const legendItems = [
        { color: "#003366", label: "90 – 100 (Very High)" },   // Dark Navy Blue
        { color: "#005b96", label: "80 – 89 (High)" },         // Deep Sky Blue
        { color: "#3399cc", label: "70 – 79 (Moderate)" },     // Lighter Blue
        { color: "#85c1e9", label: "60 – 69 (Low)" },          // Light Sky Blue
        { color: "#d6eaf8", label: "< 60 (Very Low)" },        // Very Light Blue
    ];


    // Color scale function
    const getColor = (value) => {
        if (value >= 90) return "#003366";
        if (value >= 80) return "#005b96";
        if (value >= 70) return "#3399cc";
        if (value >= 60) return "#85c1e9";
        return "#d6eaf8";
    };


    const [selectedPeriod, setSelectedPeriod] = useState('current');
    const headers = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const handleSelectChange = (e) => {
        setSelectedPeriod(e.target.value);
        if (e.target.value === 'current') {
            setData([
                { machine: "MACHINE A", values: [78, 85, 88, 92, 70, 82, 87] },
                { machine: "MACHINE B", values: [65, 68, 72, 75, 80, 78, 85] },
                { machine: "MACHINE C", values: [55, 60, 63, 68, 65, 70, 75] },
                { machine: "MACHINE D", values: [88, 85, 82, 80, 78, 76, 74] },
                { machine: "MACHINE E", values: [91, 92, 90, 88, 85, 84, 82] },
                { machine: "MACHINE F", values: [91, 92, 90, 88, 85, 84, 82] },
            ])
        } else {
            setData([
                { machine: "MACHINE A", values: [80, 82, 85, 87, 90, 92, 95] },
                { machine: "MACHINE B", values: [70, 72, 75, 78, 80, 82, 85] },
                { machine: "MACHINE C", values: [60, 62, 65, 68, 70, 72, 75] },
                { machine: "MACHINE D", values: [85, 87, 90, 92, 94, 96, 98] },
                { machine: "MACHINE E", values: [88, 90, 92, 94, 96, 98, 100] },
                { machine: "MACHINE F", values: [88, 90, 92, 94, 96, 98, 100] },
            ])
        }

    }

    return (
        <div className=" col-12 col-lg-8 col-md-12" style={{ overflow: 'scroll' }}>
            <div className="card-container">
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <h6 style={{ fontWeight: "600" }}>
                        Machine Workload Heatmap by Technician
                    </h6>
                    <select
                        className="form-select mb-1"
                        style={{ width: '95px', fontSize: '10px', padding: '4px 4px' }}
                        value={selectedPeriod}
                        onChange={handleSelectChange}
                    >
                        <option value="current">Current</option>
                        <option value="previous week">Previous week</option>
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "8px", fontFamily: "sans-serif", fontSize: "10px" }}>
                    {legendItems.map((item, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center" }}>
                            <div
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: item.color,
                                    marginRight: "8px",
                                    border: "1px solid #ccc",
                                }}
                            ></div>
                            {item.label}
                        </div>
                    ))}
                </div>

                <div className="table-responsive mt-3" style={{ overflow: "scroll" }}>
                    <table className="text-center align-middle" style={{ height: "15rem" }}>
                        <thead>
                            <tr>
                                <th className="p-2" style={{ fontWeight: "bold", fontSize: "15px" }}>Machine</th>
                                {headers.map((day, i) => (
                                    <th key={i} style={{ fontWeight: "bold", fontSize: "15px" }}>
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="">
                            {data.map((row, i) => (
                                <tr key={i}>
                                    <td style={{ fontSize: "12px" }} >
                                        {row.machine}
                                    </td>
                                    {row.values.map((val, j) => (
                                        <td
                                            key={j}
                                            style={{
                                                backgroundColor: getColor(val),
                                                color: val > 85 ? "#fff" : "#000",
                                                height: "30px",
                                                width: "105px",
                                                margin: "5px",
                                                fontSize: "12px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                            }}
                                        >
                                            {/* {val}% */}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>


        </div>
    );
};

export default OEEHeatmap;
