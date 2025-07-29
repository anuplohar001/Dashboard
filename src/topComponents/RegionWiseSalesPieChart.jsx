import React, { useState } from "react";
import HoverText from "./HoverText";
import { Card } from "react-bootstrap";

const RegionWiseSalesPieChart = () => {

    const [data, setdata] = useState([
        { region: "North", value: 30, color: "#007bff" },   // Blue
        { region: "South", value: 20, color: "#28a745" },   // Green
        { region: "East", value: 25, color: "#ffc107" },    // Yellow
        { region: "West", value: 25, color: "#dc3545" },    // Red
    ])
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const [hovered, setHovered] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoverData, setHoverData] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('current');

    const handleSelectChange = (e) => {
        setSelectedPeriod(e.target.value);
        if (e.target.value === 'current') {
            setdata([
                { region: "North", value: 30, color: "#007bff" },   // Blue
                { region: "South", value: 20, color: "#28a745" },   // Green
                { region: "East", value: 25, color: "#ffc107" },    // Yellow
                { region: "West", value: 25, color: "#dc3545" },    // Red
            ])
        } else {
            setdata([
                { region: "North", value: 40, color: "#007bff" },   // Blue
                { region: "South", value: 30, color: "#28a745" },   // Green
                { region: "East", value: 20, color: "#ffc107" },    // Yellow
                { region: "West", value: 10, color: "#dc3545" },    // Red
            ])
        }
    }

    const handleMouseMove = (e, value) => {
        const x = e.clientX;
        const y = e.clientY;
        setMousePos({
            x: x,
            y: y,
        });
        setHoverData(value);
    };
    // Function to create pie slices
    const createPieSegments = () => {
        let cumulative = 0;
        return data.map((slice, index) => {
            const [cx, cy, r] = [80, 80, 70];
            const startAngle = (cumulative / total) * 2 * Math.PI;
            cumulative += slice.value;
            const endAngle = (cumulative / total) * 2 * Math.PI;

            const x1 = cx + r * Math.cos(startAngle);
            const y1 = cy + r * Math.sin(startAngle);
            const x2 = cx + r * Math.cos(endAngle);
            const y2 = cy + r * Math.sin(endAngle);
            const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

            const pathData = `
        M ${cx} ${cy}
        L ${x1} ${y1}
        A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;

            return (
                <path
                    key={index}
                    d={pathData}
                    fill={slice.color}
                    stroke="#fff"
                    strokeWidth="1"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onMouseMove={(e) => handleMouseMove(e, `${slice.region}: ${slice.value}`)}
                />
            );
        });
    };

    return (
        <div className="">
            <div className="card-container mycards" style={{ height: "18.5rem" }}>
            <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6 className="fw-bold mb-2">Sales By Region</h6>
                <select
                    className="form-select form-select-sm mb-1"
                    style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}
                    value={selectedPeriod}
                    onChange={handleSelectChange}
                >
                    <option value="current">Current</option>
                    <option value="2024">2024</option>
                </select>
            </div>
                <div className="d-flex">

                    <div className="mt-3">
                        {data.map((item, idx) => (
                            <div key={idx} className="d-flex align-items-center mb-1">
                                <div
                                    style={{
                                        width: "14px",
                                        height: "14px",
                                        backgroundColor: item.color,
                                        marginRight: "8px",
                                    }}
                                    
                                ></div>
                                <span className="small">
                                    {item.region}: {item.value}%
                                </span>
                            </div>
                        ))}
                    </div>
                    <svg width="160" height="160" className="mx-auto">
                        {createPieSegments()}
                    </svg>
                </div>

            </div>

            {hovered && (<HoverText x={mousePos.x} y={mousePos.y} data={hoverData} />)}
        </div >
    );
};

export default RegionWiseSalesPieChart;
