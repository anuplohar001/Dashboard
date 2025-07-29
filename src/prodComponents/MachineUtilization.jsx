import React, { useState } from 'react';
import HoverText from "../topComponents/HoverText"

const MachineUtilizationChart = () => {
    // Sample data for machine utilization
    const [machineData, setMachineData] = useState([
        { id: 'M1', utilization: 93.75 },
        { id: 'M2', utilization: 85.00 },
        { id: 'M3', utilization: 90.00 },
        { id: 'M4', utilization: 70.00 },
        { id: 'M5', utilization: 60.00 },
        { id: 'M6', utilization: 97.50 },
        { id: 'M7', utilization: 80.00 },
        { id: 'M8', utilization: 40.00 }
    ]);

    // Chart dimensions
    const chartWidth = 470;
    const chartHeight = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    const [selectedPeriod, setSelectedPeriod] = useState('current');

    // Bar calculations
    const barWidth = innerWidth / machineData.length * 0.7;
    const barSpacing = innerWidth / machineData.length * 0.3;

    // Y-axis scale (0-100%)
    const yScale = (value) => innerHeight - (value / 100) * innerHeight;

    const [hovered, setHovered] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoverData, setHoverData] = useState(null);

    const handleMouseMove = (e, value) => {
        const x = e.clientX;
        const y = e.clientY;
        setMousePos({
            x: x,
            y: y,
        });
        setHoverData(value);
    };


    const handleSelectedPeriod = (e) => {
        const value = e.target.value;
        setSelectedPeriod(value);
        if (value === '2024') {
            setMachineData([
                { id: 'M1', utilization: 95.00 },
                { id: 'M2', utilization: 88.00 },
                { id: 'M3', utilization: 92.00 },
                { id: 'M4', utilization: 75.00 },
                { id: 'M5', utilization: 65.00 },
                { id: 'M6', utilization: 98.00 },
                { id: 'M7', utilization: 82.00 },
                { id: 'M8', utilization: 45.00 }
            ]);
        } else if (value === 'current') {
            setMachineData([
                { id: 'M1', utilization: 93.75 },
                { id: 'M2', utilization: 85.00 },
                { id: 'M3', utilization: 90.00 },
                { id: 'M4', utilization: 70.00 },
                { id: 'M5', utilization: 60.00 },
                { id: 'M6', utilization: 97.50 },
                { id: 'M7', utilization: 80.00 },
                { id: 'M8', utilization: 40.00 }
            ]);
        }
    }

    return (
        <div>
            <div className="card-container anup prodcharts machineutilization" style={{ height: "27rem", border: '1px solid #dee2e6' }}>
                <div className="card-body">
                    {/* Header */}
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <h6 className="card-title mb-1 fw-bold text-dark">Machine Utilization %</h6>
                        <select
                            className="form-select form-select-sm mb-1"
                            style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}
                            value={selectedPeriod}
                            onChange={handleSelectedPeriod}
                        >
                            <option value="current">Current</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>

                    {/* Chart */}
                    <div className="d-flex" style={{ overflow: "scroll", backgroundColor: '#f8f9fa', }}>
                        <div style={{ width: "fit-content" }}>

                            <svg width={chartWidth} height={chartHeight}>
                                {/* Y-axis grid lines */}
                                {[0, 25, 50, 75, 100].map(tick => (
                                    <g key={tick}>
                                        <line
                                            x1={margin.left}
                                            y1={margin.top + yScale(tick)}
                                            x2={margin.left + innerWidth}
                                            y2={margin.top + yScale(tick)}
                                            stroke="#e9ecef"
                                            strokeWidth="1"
                                        />
                                        <text
                                            x={margin.left - 5}
                                            y={margin.top + yScale(tick) + 4}
                                            textAnchor="end"
                                            fontSize="10"
                                            fill="#6c757d"
                                        >
                                            {tick}
                                        </text>
                                    </g>
                                ))}

                                {/* Bars */}
                                {machineData.map((machine, index) => {
                                    const x = margin.left + index * (barWidth + barSpacing) + barSpacing / 2;
                                    const barHeight = (machine.utilization / 100) * innerHeight;
                                    const y = margin.top + innerHeight - barHeight;

                                    return (
                                        <g key={machine.id}>
                                            {/* Bar */}
                                            <rect
                                                className="hovered"
                                                x={x}
                                                y={y}
                                                width={barWidth}
                                                height={barHeight}
                                                fill="#0d6efd"
                                                rx="2"
                                                onMouseEnter={() => setHovered(true)}
                                                onMouseLeave={() => setHovered(false)}
                                                onMouseMove={(e) => handleMouseMove(e, `${machine.id}: ${machine.utilization}`)}
                                            />

                                            {/* Machine ID below bar */}
                                            <text
                                                x={x + barWidth / 2}
                                                y={margin.top + innerHeight + 15}
                                                textAnchor="middle"
                                                fontSize="10"
                                                fill="#6c757d"
                                            >
                                                {machine.id}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Y-axis label */}
                                <text
                                    x={15}
                                    y={margin.top + innerHeight / 2}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#6c757d"
                                    transform={`rotate(-90, 15, ${margin.top + innerHeight / 2})`}
                                >
                                    percentages %
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Bottom section with key metrics */}
                    <div className="mt-1 pt-2 border-top">
                        <div className="row g-2">
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {Math.max(...machineData.map(m => m.utilization)).toFixed(0)}%
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Peak</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {machineData.filter(m => m.utilization >= 80).length}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Above 80%</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {Math.min(...machineData.map(m => m.utilization)).toFixed(0)}%
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Lowest</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {hovered && (<HoverText x={mousePos.x} y={mousePos.y} data={hoverData} />)}
        </div>
    );
};

export default MachineUtilizationChart;