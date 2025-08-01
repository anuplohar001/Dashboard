import React, { useState } from 'react';

const OperatorPerformanceChart = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Sample data - replace with your actual data
    const data = [
        { operator: 'OpA', outputQty: 145, target: 120, efficiency: 121, shift: 'Morning' },
        { operator: 'OpB', outputQty: 118, target: 120, efficiency: 98, shift: 'Morning' },
        { operator: 'OpC', outputQty: 130, target: 120, efficiency: 108, shift: 'Evening' },
        { operator: 'OpD', outputQty: 125, target: 120, efficiency: 104, shift: 'Evening' },
        { operator: 'OpE', outputQty: 95, target: 120, efficiency: 79, shift: 'Night' },
        { operator: 'OpF', outputQty: 138, target: 120, efficiency: 115, shift: 'Morning' },
        { operator: 'OpG', outputQty: 110, target: 120, efficiency: 92, shift: 'Night' },
        { operator: 'OpH', outputQty: 142, target: 120, efficiency: 118, shift: 'Evening' }
    ];

    // Sort data by output quantity in descending order
    const sortedData = [...data].sort((a, b) => b.outputQty - a.outputQty);

    // Chart dimensions
    const chartWidth = 450;
    const chartHeight = 280;
    const margin = { top: 20, right: 40, bottom: 50, left: 60 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    const [selectedPeriod, setSelectedPeriod] = useState('current');

    // Scales
    const maxOutput = Math.max(...sortedData.map(d => d.outputQty));
    const minOutput = Math.min(...sortedData.map(d => d.outputQty));
    const yPadding = (maxOutput - minOutput) * 0.1;
    const yMax = maxOutput + yPadding;
    const yMin = Math.max(0, minOutput - yPadding);

    // Y-axis scale for output quantity
    const yScale = (value) => innerHeight - ((value - yMin) / (yMax - yMin)) * innerHeight;

    // X-axis positioning
    const xSpacing = innerWidth / sortedData.length;

    // Generate Y-axis ticks
    const yTicks = [];
    const yStep = Math.ceil((yMax - yMin) / 6 / 10) * 10;
    for (let i = Math.ceil(yMin / yStep) * yStep; i <= yMax; i += yStep) {
        yTicks.push(i);
    }

    // Target line
    const targetValue = 120;
    const targetY = margin.top + yScale(targetValue);

    // Color based on performance vs target
    const getPerformanceColor = (outputQty, target) => {
        const ratio = outputQty / target;
        if (ratio >= 1.1) return '#28a745'; // Excellent (>110%)
        if (ratio >= 1.0) return '#17a2b8'; // Good (100-110%)
        if (ratio >= 0.9) return '#ffc107'; // Fair (90-100%)
        return '#dc3545'; // Poor (<90%)
    };

    const getShiftColor = (shift) => {
        switch (shift) {
            case 'Morning': return '#007bff';
            case 'Evening': return '#6f42c1';
            case 'Night': return '#6c757d';
            default: return '#28a745';
        }
    };

    const handleMouseMove = (e, index) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className='operatorwise '>
            <div className="card-container anup" style={{ border: '1px solid #dee2e6' }}>
                <div className=" d-flex flex-column justify-content-center align-items-center" style={{ overflow: 'scroll'}}>
                    {/* Title */}
                    <div className="mb-3 d-flex justify-content-evenly align-items-center" style={{ width: '100%' }}>
                        <h6 className="text-dark mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                            Operator-wise Performance
                        </h6>
                        <select
                            className="form-select form-select-sm mb-1"
                            style={{ width: '75px', fontSize: '10px', padding: '2px 4px' }}
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                        >
                            <option value="current">Current</option>
                            <option value="2024">2024</option>
                        </select>
                        
                    </div>

                    {/* Chart Container */}
                    <div style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="position-relative">
                            <svg width={chartWidth} height={chartHeight}>
                                {/* Grid lines */}
                                <defs>
                                    <pattern id="grid" width="100%" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 0 20 L 100 20" fill="none" stroke="#e9ecef" strokeWidth="1" />
                                    </pattern>
                                </defs>

                                {/* Background grid */}
                                <rect
                                    x={margin.left}
                                    y={margin.top}
                                    width={innerWidth}
                                    height={innerHeight}
                                    fill="url(#grid)"
                                />

                                {/* Y-axis */}
                                <line
                                    x1={margin.left}
                                    y1={margin.top}
                                    x2={margin.left}
                                    y2={margin.top + innerHeight}
                                    stroke="#dee2e6"
                                    strokeWidth="1"
                                />

                                {/* X-axis */}
                                <line
                                    x1={margin.left}
                                    y1={margin.top + innerHeight}
                                    x2={margin.left + innerWidth}
                                    y2={margin.top + innerHeight}
                                    stroke="#dee2e6"
                                    strokeWidth="1"
                                />

                                {/* Target line */}
                                <line
                                    x1={margin.left}
                                    y1={targetY}
                                    x2={margin.left + innerWidth}
                                    y2={targetY}
                                    stroke="#fd7e14"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                />

                                {/* Target label */}
                                <text
                                    x={margin.left + innerWidth - 5}
                                    y={targetY - 5}
                                    textAnchor="end"
                                    fontSize="10"
                                    fill="#fd7e14"
                                    fontWeight="600"
                                >
                                    Target: {targetValue}
                                </text>

                                {/* Y-axis ticks and labels */}
                                {yTicks.map(tick => (
                                    <g key={tick}>
                                        <line
                                            x1={margin.left - 5}
                                            y1={margin.top + yScale(tick)}
                                            x2={margin.left}
                                            y2={margin.top + yScale(tick)}
                                            stroke="#dee2e6"
                                            strokeWidth="1"
                                        />
                                        <text
                                            x={margin.left - 10}
                                            y={margin.top + yScale(tick)}
                                            textAnchor="end"
                                            dominantBaseline="middle"
                                            fontSize="11"
                                            fill="#6c757d"
                                        >
                                            {tick}
                                        </text>
                                    </g>
                                ))}

                                {/* Lollipop stems and circles */}
                                {sortedData.map((item, index) => {
                                    const x = margin.left + xSpacing * index + xSpacing / 2;
                                    const y = margin.top + yScale(item.outputQty);
                                    const baseY = margin.top + innerHeight;
                                    const isHovered = hoveredIndex === index;
                                    const performanceColor = getPerformanceColor(item.outputQty, item.target);
                                    const shiftColor = getShiftColor(item.shift);

                                    return (
                                        <g key={index}>
                                            {/* Lollipop stem */}
                                            <line
                                                x1={x}
                                                y1={baseY}
                                                x2={x}
                                                y2={y}
                                                stroke={performanceColor}
                                                strokeWidth="3"
                                                opacity={hoveredIndex !== null && hoveredIndex !== index ? 0.6 : 1}
                                            />

                                            {/* Lollipop circle */}
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r={isHovered ? "8" : "6"}
                                                fill={performanceColor}
                                                stroke="#fff"
                                                strokeWidth="2"
                                                onMouseMove={(e) => handleMouseMove(e, index)}
                                                onMouseLeave={handleMouseLeave}
                                                style={{ cursor: 'pointer' }}
                                                opacity={hoveredIndex !== null && hoveredIndex !== index ? 0.6 : 1}
                                            />

                                            {/* Shift indicator (small circle) */}
                                            <circle
                                                cx={x + 10}
                                                cy={y - 10}
                                                r="3"
                                                fill={shiftColor}
                                                stroke="#fff"
                                                strokeWidth="1"
                                            />

                                            {/* Output quantity labels */}
                                            <text
                                                x={x}
                                                y={y - 15}
                                                textAnchor="middle"
                                                fontSize="11"
                                                fill={performanceColor}
                                                fontWeight="bold"
                                            >
                                                {item.outputQty}
                                            </text>

                                            {/* X-axis labels (rotated) */}
                                            <text
                                                x={x}
                                                y={baseY + 15}
                                                textAnchor="middle"
                                                fontSize="11"
                                                fill="#6c757d"
                                                fontWeight="600"
                                            >
                                                {item.operator}
                                            </text>

                                            {/* Efficiency percentage */}
                                            <text
                                                x={x}
                                                y={baseY + 30}
                                                textAnchor="middle"
                                                fontSize="9"
                                                fill={performanceColor}
                                                fontWeight="600"
                                            >
                                                {item.efficiency}%
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Axis labels */}
                                <text
                                    x={margin.left / 2}
                                    y={margin.top + innerHeight / 2}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6c757d"
                                    transform={`rotate(-90 ${margin.left / 2} ${margin.top + innerHeight / 2})`}
                                >
                                    Output Quantity (Units/Day)
                                </text>

                                <text
                                    x={margin.left + innerWidth / 2}
                                    y={margin.top + innerHeight + 45}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6c757d"
                                >
                                    Operators
                                </text>
                            </svg>

                            
                        </div>
                    </div>

                    {/* Performance Summary */}
                    <div style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', width:"300px" }}>
                        <div className="row text-center justify-content-center">
                            <div className="col-3">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Top Performer</div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#28a745' }}>
                                    {sortedData[0].operator}
                                </div>
                                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                    {sortedData[0].outputQty} units
                                </div>
                            </div>
                            <div className="col-3">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Avg Output</div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#007bff' }}>
                                    {Math.round(sortedData.reduce((sum, item) => sum + item.outputQty, 0) / sortedData.length)}
                                </div>
                                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                    units/day
                                </div>
                            </div>
                            <div className="col-3">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Above Target</div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#28a745' }}>
                                    {sortedData.filter(item => item.outputQty >= item.target).length}
                                </div>
                                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                    operators
                                </div>
                            </div>
                            <div className="col-3">
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>Below Target</div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#dc3545' }}>
                                    {sortedData.filter(item => item.outputQty < item.target).length}
                                </div>
                                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                                    operators
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-1" style={{width:"300px"}}>
                        <div className="row">
                            <div className="col-6">
                                <div style={{ fontSize: '11px', fontWeight: '600', color: '#6c757d', marginBottom: '5px' }}>Performance</div>
                                <div className="d-flex flex-wrap">
                                    <div className="d-flex align-items-center me-2 mb-1">
                                        <div className="rounded-circle me-1" style={{ width: '6px', height: '6px', backgroundColor: '#28a745' }}></div>
                                        <span style={{ fontSize: '9px' }}>Excellent</span>
                                    </div>
                                    <div className="d-flex align-items-center me-2 mb-1">
                                        <div className="rounded-circle me-1" style={{ width: '6px', height: '6px', backgroundColor: '#17a2b8' }}></div>
                                        <span style={{ fontSize: '9px' }}>Good</span>
                                    </div>
                                    <div className="d-flex align-items-center me-2 mb-1">
                                        <div className="rounded-circle me-1" style={{ width: '6px', height: '6px', backgroundColor: '#ffc107' }}></div>
                                        <span style={{ fontSize: '9px' }}>Fair</span>
                                    </div>
                                    <div className="d-flex align-items-center me-2 mb-1">
                                        <div className="rounded-circle me-1" style={{ width: '6px', height: '6px', backgroundColor: '#dc3545' }}></div>
                                        <span style={{ fontSize: '9px' }}>Poor</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div style={{ fontSize: '11px', fontWeight: '600', color: '#6c757d', marginBottom: '5px' }}>Shifts</div>
                                <div className="d-flex flex-wrap">
                                    <div className="d-flex align-items-center me-2 mb-1">
                                        <div className="rounded-circle me-1" style={{ width: '6px', height: '6px', backgroundColor: '#007bff' }}></div>
                                        <span style={{ fontSize: '9px' }}>Morning</span>
                                    </div>
                                    <div className="d-flex align-items-center me-2 mb-1">
                                        <div className="rounded-circle me-1" style={{ width: '6px', height: '6px', backgroundColor: '#6f42c1' }}></div>
                                        <span style={{ fontSize: '9px' }}>Evening</span>
                                    </div>
                                    <div className="d-flex align-items-center me-2 mb-1">
                                        <div className="rounded-circle me-1" style={{ width: '6px', height: '6px', backgroundColor: '#6c757d' }}></div>
                                        <span style={{ fontSize: '9px' }}>Night</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tooltip */}
            {hoveredIndex !== null && (
                <div
                    className="position-fixed bg-dark text-white p-2 rounded shadow-sm"
                    style={{
                        left: mousePosition.x + 10,
                        top: mousePosition.y + 10,
                        fontSize: '11px',
                        zIndex: 1000,
                        whiteSpace: 'nowrap'
                    }}
                >
                    <div className="fw-bold text-info">
                        {sortedData[hoveredIndex].operator}
                    </div>
                    <div>Output: <span className="text-warning">{sortedData[hoveredIndex].outputQty} units/day</span></div>
                    <div>Target: <span className="text-success">{sortedData[hoveredIndex].target} units/day</span></div>
                    <div>Efficiency: <span className="text-info">{sortedData[hoveredIndex].efficiency}%</span></div>
                    <div>Shift: <span style={{ color: getShiftColor(sortedData[hoveredIndex].shift) }}>{sortedData[hoveredIndex].shift}</span></div>
                </div>
            )}
        </div>
    );
};

export default OperatorPerformanceChart;