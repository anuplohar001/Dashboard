import React, { useState } from 'react';
import HoverText from "../topComponents/HoverText"

const MachineCostChart = () => {
    // Sample data for machine utilization
    const [machineData, setMachineData] = useState([
        { id: 'M1', utilization: 15200 },
        { id: 'M2', utilization: 67800 },
        { id: 'M3', utilization: 45000 },
        { id: 'M4', utilization: 99800 },
        { id: 'M5', utilization: 23400 },
        { id: 'M6', utilization: 86500 },
        { id: 'M7', utilization: 39200 },
        { id: 'M8', utilization: 11800 }
    ]);

    // Chart dimensions
    const maxUtilization = Math.max(...machineData.map(machine => machine.utilization));
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
                { id: 'M1', utilization: 15200 },
                { id: 'M2', utilization: 67800 },
                { id: 'M3', utilization: 45000 },
                { id: 'M4', utilization: 99800 },
                { id: 'M5', utilization: 23400 },
                { id: 'M6', utilization: 86500 },
                { id: 'M7', utilization: 39200 },
                { id: 'M8', utilization: 11800 }
            ]);
        } else if (value === 'current') {
            setMachineData([
                { id: 'M1', utilization: 83500 }, // Machine Cost in ₹ or $
                { id: 'M2', utilization: 48900 },
                { id: 'M3', utilization: 73200 },
                { id: 'M4', utilization: 15400 },
                { id: 'M5', utilization: 9960 },
                { id: 'M6', utilization: 92000 },
                { id: 'M7', utilization: 36250 },
                { id: 'M8', utilization: 12800 }
            ]);
        }
    }

    return (
        <div className='col-lg-6 col-md-6 col-12'>
            <div className="card-container " style={{ border: '1px solid #dee2e6' }}>
                <div className="card-body">
                    {/* Header */}
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <h6 className="card-title mb-1 fw-bold text-dark">Machine Cost ₹</h6>
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
                                            {tick}K
                                        </text>
                                    </g>
                                ))}

                                {/* Bars */}
                                {machineData.map((machine, index) => {
                                    const x = margin.left + index * (barWidth + barSpacing) + barSpacing / 2;
                                    const barHeight = (machine.utilization / maxUtilization) * innerHeight;
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
                                                fill="#07e09fff"
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
                                    Cost ₹
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
                                        ₹{Math.max(...machineData.map(m => m.utilization)).toFixed(0)}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Highest</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        {machineData.filter(m => m.utilization >= 50000).length}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '10px' }}>Above 50K</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                                        ₹{Math.min(...machineData.map(m => m.utilization)).toFixed(0)}
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

export default MachineCostChart;